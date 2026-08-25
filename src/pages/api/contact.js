import nodemailer from 'nodemailer';

// ─── In-Memory IP Rate Limiter ─────────────────────────────────────────────
// Sliding window: max 5 requests per IP per 15 minutes.
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart);
  hits.push(now);
  rateLimitMap.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

// ─── HTML Sanitizer ────────────────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[<>&"'`]/g, (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;',
    }[c]))
    .trim();
}

// ─── Field Validators ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, subject, message }) {
  if (!name || name.length < 2 || name.length > 100)
    return 'Ad Soyad 2-100 karakter arasinda olmalidir.';
  if (!email || !EMAIL_RE.test(email))
    return 'Gecerli bir e-posta adresi giriniz.';
  if (!subject || subject.length < 2 || subject.length > 200)
    return 'Konu 2-200 karakter arasinda olmalidir.';
  if (!message || message.length < 10 || message.length > 5000)
    return 'Mesaj 10-5000 karakter arasinda olmalidir.';
  return null;
}

// ─── Cloudflare Turnstile Verification ────────────────────────────────────
async function verifyTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // graceful skip

  if (!token) return false;

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    console.error('[Turnstile] Verification request failed, failing open.');
    return true;
  }
}

// ─── HTML Email Template ───────────────────────────────────────────────────
function buildHtmlEmail({ name, email, subject, message }) {
  const date = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin:0; padding:0; background:#f5f5f5; font-family:Arial,sans-serif; }
    .wrapper { max-width:600px; margin:32px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    .header { background:#303841; padding:32px 40px; }
    .header h1 { margin:0; font-size:22px; color:#ffffff; font-weight:700; }
    .header p  { margin:4px 0 0; font-size:13px; color:#76ABAE; }
    .body   { padding:32px 40px; }
    .field  { margin-bottom:20px; }
    .field-label { font-size:11px; font-weight:600; color:#76ABAE; text-transform:uppercase; letter-spacing:.8px; margin-bottom:4px; }
    .field-value { font-size:15px; color:#303841; line-height:1.6; }
    .message-box { background:#f5f5f5; border-left:4px solid #76ABAE; border-radius:4px; padding:16px 20px; font-size:14px; color:#333; white-space:pre-wrap; word-break:break-word; }
    .footer { background:#f9f9f9; border-top:1px solid #ebebeb; padding:16px 40px; text-align:center; font-size:12px; color:#aaa; }
    a { color:#FF5722; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Yeni Iletisim Formu Mesaji</h1>
      <p>BRC Kalip &amp; 4 El Plastik - Website</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Gonderen</div>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <div class="field-label">E-Posta</div>
        <div class="field-value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Konu</div>
        <div class="field-value">${subject}</div>
      </div>
      <div class="field">
        <div class="field-label">Mesaj</div>
        <div class="message-box">${message}</div>
      </div>
      <div class="field" style="margin-top:24px;">
        <div class="field-label">Gonderilme Tarihi</div>
        <div class="field-value" style="font-size:13px;color:#888;">${date}</div>
      </div>
    </div>
    <div class="footer">
      Bu mesaj <strong>brckalip.com.tr</strong> web sitesindeki iletisim formundan gonderilmistir.
    </div>
  </div>
</body>
</html>`;
}

// ─── Nodemailer Transporter ────────────────────────────────────────────────
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP ort am degiskenleri eksik. .env.local dosyanizi kontrol edin.');
  }

  const port = parseInt(SMTP_PORT || '465', 10);
  const secure = SMTP_SECURE !== 'false';

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });
}

// ─── Main Handler ──────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: 'Cok fazla istek gonderildi. Lutfen 15 dakika sonra tekrar deneyin.',
    });
  }

  const { name, email, subject, message, website, turnstileToken } = req.body || {};

  // Honeypot
  if (website) {
    console.info(`[Honeypot] Bot request blocked. IP: ${ip}`);
    return res.status(200).json({ success: true, message: 'Mesajiniz gonderildi.' });
  }

  // Turnstile
  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return res.status(400).json({
      success: false,
      message: 'CAPTCHA dogrulamasi basarisiz. Lutfen sayfayi yenileyip tekrar deneyin.',
    });
  }

  const cleanName    = sanitize(name);
  const cleanEmail   = sanitize(email);
  const cleanSubject = sanitize(subject);
  const cleanMessage = sanitize(message);

  const validationError = validate({
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  });
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  try {
    const transporter = createTransporter();

    const toEmail   = process.env.CONTACT_TO_EMAIL || 'bilgi@brckalip.com.tr';
    const fromName  = process.env.CONTACT_FROM_NAME || 'BRC Kalip Website';
    const fromEmail = process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `[Website Iletisim] ${cleanSubject}`,
      text: `Gonderen: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
      html: buildHtmlEmail({
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      }),
    });

    console.info(`[Contact] Mail sent from ${cleanEmail} at ${new Date().toISOString()}`);

    return res.status(200).json({
      success: true,
      message: 'Mesajiniz basariyla iletildi. En kisa surede size donus yapacagiz.',
    });

  } catch (err) {
    console.error('[Contact] Mail send error:', err.message);
    return res.status(500).json({
      success: false,
      message:
        'Mesajiniz gonderilemedi. Lutfen daha sonra tekrar deneyin veya bizi dogrudan arayin.',
    });
  }
}
