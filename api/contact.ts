import nodemailer from 'nodemailer';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
}

const allowedSubjects = new Set(['استفسار عام', 'فرصة استثمارية', 'طلب عضوية', 'شراكة استراتيجية', 'أخرى']);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }

  const body = (request.body ?? {}) as ContactPayload;
  const name = cleanText(body.name, 100).replace(/[\r\n]/g, ' ');
  const email = cleanText(body.email, 160).toLowerCase();
  const subject = cleanText(body.subject, 80).replace(/[\r\n]/g, ' ');
  const message = cleanText(body.message, 5000);
  const website = cleanText(body.website, 200);

  // Honeypot field: bots often fill this hidden input.
  if (website) return response.status(200).json({ success: true });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name.length < 2 || !emailPattern.test(email) || !allowedSubjects.has(subject) || message.length < 10) {
    return response.status(400).json({ success: false, message: 'يرجى التحقق من البيانات وإعادة المحاولة.' });
  }

  const requiredEnvironment = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
  if (requiredEnvironment.some((key) => !process.env[key])) {
    return response.status(503).json({ success: false, message: 'خدمة البريد غير مهيأة حاليًا.' });
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port)) {
    return response.status(503).json({ success: false, message: 'إعدادات خدمة البريد غير صحيحة.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 25_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

  try {
    await transporter.sendMail({
      from: `موقع مجلس الأعمال السوري المصري <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO || 'segybc@gmail.com',
      replyTo: email,
      subject: `[موقع المجلس] ${subject} — ${name}`,
      text: `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالموضوع: ${subject}\n\nالرسالة:\n${message}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#12231c">
          <div style="background:#073c2b;color:#fff;padding:22px 26px;border-radius:14px 14px 0 0">
            <h2 style="margin:0;font-size:20px">طلب جديد من موقع المجلس</h2>
          </div>
          <div style="border:1px solid #dde4df;border-top:0;padding:26px;border-radius:0 0 14px 14px">
            <p><strong>الاسم:</strong> ${safeName}</p>
            <p><strong>البريد الإلكتروني:</strong> <span dir="ltr">${safeEmail}</span></p>
            <p><strong>الموضوع:</strong> ${safeSubject}</p>
            <hr style="border:0;border-top:1px solid #dde4df;margin:22px 0" />
            <p style="line-height:1.9"><strong>الرسالة:</strong><br />${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return response.status(200).json({ success: true, message: 'تم إرسال رسالتك بنجاح.' });
  } catch {
    return response.status(502).json({ success: false, message: 'تعذّر إرسال الرسالة حاليًا. يرجى المحاولة لاحقًا.' });
  }
}
