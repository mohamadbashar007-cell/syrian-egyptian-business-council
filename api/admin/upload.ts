import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { requireAdmin } from '../_lib/auth';
import type { ApiRequest, ApiResponse } from '../_lib/http';
import { adminHeaders, readJsonBody } from '../_lib/http';
import { imageStorageRoot } from '../_lib/news-store';

interface UploadBody {
  image?: unknown;
  filename?: unknown;
}

const allowedMimeTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
]);

export default async function handler(request: ApiRequest, response: ApiResponse) {
  adminHeaders(response);
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }
  if (!requireAdmin(request, response)) return;

  try {
    const { image, filename } = readJsonBody<UploadBody>(request);
    if (typeof image !== 'string') throw new Error('لم يتم اختيار صورة.');
    const match = image.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) throw new Error('صيغة الصورة غير مدعومة.');

    const mimeType = match[1];
    const extension = allowedMimeTypes.get(mimeType);
    if (!extension) throw new Error('صيغة الصورة غير مدعومة.');
    const buffer = Buffer.from(match[2], 'base64');
    if (buffer.length === 0 || buffer.length > 3 * 1024 * 1024) throw new Error('يجب ألا يتجاوز حجم الصورة 3 ميغابايت.');

    const baseName = typeof filename === 'string'
      ? filename.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 50) || 'news'
      : 'news';
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const relativeDirectory = path.join(year, month);
    const directory = path.join(imageStorageRoot, relativeDirectory);
    await mkdir(directory, { recursive: true });

    const storedName = `${Date.now()}-${randomUUID().slice(0, 8)}-${baseName}.${extension}`;
    await writeFile(path.join(directory, storedName), buffer, { flag: 'wx' });
    const url = `/uploads/news/${year}/${month}/${storedName}`;
    return response.status(200).json({ success: true, url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذّر رفع الصورة.';
    return response.status(400).json({ success: false, message });
  }
}
