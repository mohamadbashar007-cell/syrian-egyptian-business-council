import { createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import type { ApiRequest, ApiResponse } from './http';

const COOKIE_NAME = 'segybc_admin';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || '';
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash('sha256').update(left).digest();
  const rightHash = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function sign(value: string) {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function cookies(request: ApiRequest) {
  const raw = request.headers.cookie;
  const cookieHeader = Array.isArray(raw) ? raw.join(';') : raw || '';
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((entry) => entry.trim().split('='))
      .filter(([key]) => key)
      .map(([key, ...value]) => [key, decodeURIComponent(value.join('='))]),
  );
}

export function authIsConfigured() {
  const parts = (process.env.ADMIN_PASSWORD_HASH || '').split('$');
  const validPasswordHash = parts.length === 3
    && parts[0] === 'scrypt'
    && /^[a-f0-9]{32}$/i.test(parts[1])
    && /^[a-f0-9]{128}$/i.test(parts[2]);
  return validPasswordHash && getSessionSecret().length >= 32;
}

export function passwordMatches(password: unknown) {
  if (typeof password !== 'string' || password.length < 1 || password.length > 256) return false;
  const [algorithm, salt, expectedHex] = (process.env.ADMIN_PASSWORD_HASH || '').split('$');
  if (algorithm !== 'scrypt' || !salt || !expectedHex) return false;
  try {
    const expected = Buffer.from(expectedHex, 'hex');
    const actual = scryptSync(password, salt, expected.length);
    return expected.length === 64 && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function createSessionToken() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function hasValidSession(request: ApiRequest) {
  if (!authIsConfigured()) return false;
  const token = cookies(request)[COOKIE_NAME];
  if (!token) return false;

  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(expiresAt));
}

export function setSessionCookie(request: ApiRequest, response: ApiResponse, token: string) {
  const forwardedProtocol = request.headers['x-forwarded-proto'];
  const isSecure = (Array.isArray(forwardedProtocol) ? forwardedProtocol[0] : forwardedProtocol) === 'https' || process.env.VERCEL === '1';
  response.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_DURATION_SECONDS}${isSecure ? '; Secure' : ''}`,
  );
}

export function clearSessionCookie(request: ApiRequest, response: ApiResponse) {
  const forwardedProtocol = request.headers['x-forwarded-proto'];
  const isSecure = (Array.isArray(forwardedProtocol) ? forwardedProtocol[0] : forwardedProtocol) === 'https' || process.env.VERCEL === '1';
  response.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${isSecure ? '; Secure' : ''}`,
  );
}

export function requireAdmin(request: ApiRequest, response: ApiResponse) {
  if (!authIsConfigured()) {
    response.status(503).json({ success: false, message: 'لوحة الإدارة غير مهيأة بعد.' });
    return false;
  }
  if (!hasValidSession(request)) {
    response.status(401).json({ success: false, message: 'انتهت الجلسة. يرجى تسجيل الدخول مجدداً.' });
    return false;
  }
  return true;
}
