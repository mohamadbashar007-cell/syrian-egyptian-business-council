import { authIsConfigured, createSessionToken, passwordMatches, setSessionCookie } from '../_lib/auth';
import type { ApiRequest, ApiResponse } from '../_lib/http';
import { adminHeaders, clientAddress, readJsonBody, requireTrustedOrigin } from '../_lib/http';

interface LoginBody {
  password?: unknown;
}

const failedAttempts = new Map<string, { count: number; resetAt: number }>();
const ATTEMPT_WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export default async function handler(request: ApiRequest, response: ApiResponse) {
  adminHeaders(response);
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }
  if (!requireTrustedOrigin(request, response)) return;
  if (!authIsConfigured()) return response.status(503).json({ success: false, message: 'لوحة الإدارة غير مهيأة بعد.' });

  try {
    const address = clientAddress(request);
    const currentAttempt = failedAttempts.get(address);
    if (currentAttempt && currentAttempt.resetAt > Date.now() && currentAttempt.count >= MAX_ATTEMPTS) {
      response.setHeader('Retry-After', String(Math.ceil((currentAttempt.resetAt - Date.now()) / 1000)));
      return response.status(429).json({ success: false, message: 'محاولات كثيرة. حاول مجدداً بعد عدة دقائق.' });
    }
    if (currentAttempt && currentAttempt.resetAt <= Date.now()) failedAttempts.delete(address);

    const { password } = readJsonBody<LoginBody>(request);
    if (!passwordMatches(password)) {
      const previous = failedAttempts.get(address);
      failedAttempts.set(address, {
        count: (previous?.resetAt || 0) > Date.now() ? previous!.count + 1 : 1,
        resetAt: (previous?.resetAt || 0) > Date.now() ? previous!.resetAt : Date.now() + ATTEMPT_WINDOW,
      });
      await new Promise((resolve) => setTimeout(resolve, 450));
      return response.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة.' });
    }
    failedAttempts.delete(address);
    setSessionCookie(request, response, createSessionToken());
    return response.status(200).json({ success: true });
  } catch {
    return response.status(400).json({ success: false, message: 'الطلب غير صحيح.' });
  }
}
