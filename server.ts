import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import path from 'node:path';
import { access } from 'node:fs/promises';
import adminLogin from './api/admin/login';
import adminLogout from './api/admin/logout';
import adminNews from './api/admin/news';
import adminSession from './api/admin/session';
import adminUpload from './api/admin/upload';
import contact from './api/contact';
import publicNews from './api/news';
import type { ApiRequest, ApiResponse } from './api/_lib/http';
import { imageStorageRoot } from './api/_lib/news-store';

const app = express();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' https://fonts.gstatic.com data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https:",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
].join('; ');

if (!Number.isInteger(port) || port < 1 || port > 65_535) throw new Error('PORT must be a valid TCP port.');
await access(path.join(distRoot, 'index.html')).catch(() => {
  throw new Error('نسخة الموقع غير موجودة. شغّل npm run build أولاً.');
});

app.disable('x-powered-by');
app.set('trust proxy', 'loopback');
app.use(express.json({ limit: '4.25mb', type: 'application/json' }));

app.use((request, response, next) => {
  response.setHeader('Content-Security-Policy', contentSecurityPolicy);
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  if (request.secure) response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  if (request.path.startsWith('/api/')) response.setHeader('Cache-Control', 'no-store, max-age=0');
  if (request.path.startsWith('/council-desk-83') || request.path.startsWith('/api/admin/')) {
    response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  next();
});

type Handler = (request: ApiRequest, response: ApiResponse) => unknown;
const useHandler = (handler: Handler) => (request: Request, response: Response, next: NextFunction) => {
  Promise.resolve(handler(request as unknown as ApiRequest, response as unknown as ApiResponse)).catch(next);
};

app.all('/api/news', useHandler(publicNews));
app.all('/api/contact', useHandler(contact as unknown as Handler));
app.all('/api/admin/login', useHandler(adminLogin));
app.all('/api/admin/logout', useHandler(adminLogout));
app.all('/api/admin/session', useHandler(adminSession));
app.all('/api/admin/news', useHandler(adminNews));
app.all('/api/admin/upload', useHandler(adminUpload));

app.use('/uploads/news', express.static(imageStorageRoot, {
  fallthrough: false,
  immutable: true,
  maxAge: '1y',
  index: false,
}));
app.use(express.static(distRoot, { index: false, maxAge: '1h' }));

app.use((request, response) => {
  if (request.path.startsWith('/api/')) return response.status(404).json({ success: false, message: 'المسار غير موجود.' });
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return response.status(404).json({ success: false, message: 'المسار غير موجود.' });
  }
  response.setHeader('Cache-Control', request.path.startsWith('/council-desk-83') ? 'no-store' : 'no-cache');
  return response.sendFile(path.join(distRoot, 'index.html'));
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  if (response.headersSent) return;
  const tooLarge = error instanceof Error && 'type' in error && error.type === 'entity.too.large';
  response.status(tooLarge ? 413 : 500).json({
    success: false,
    message: tooLarge ? 'حجم الملف أكبر من الحد المسموح.' : 'حدث خطأ داخلي في الخادم.',
  });
});

app.listen(port, host, () => {
  console.log(`Council website: http://localhost:${port}`);
  console.log(`Private dashboard: http://localhost:${port}/council-desk-83`);
});
