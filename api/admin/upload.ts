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

function hasValidImageSignature(mimeType: string, buffer: Buffer) {
  if (mimeType === 'image/jpeg') return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mimeType === 'image/png') {
    const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    return buffer.length >= signature.length && buffer.subarray(0, signature.length).equals(signature);
  }
  if (mimeType === 'image/webp') {
    return buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
  }
  return false;
}

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
    if (!hasValidImageSignature(mimeType, buffer)) throw new Error('محتوى الملف لا يطابق صيغة الصورة المختارة.');

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
