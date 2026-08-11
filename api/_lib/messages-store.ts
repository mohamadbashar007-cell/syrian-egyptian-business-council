import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { storageRoot } from './news-store';

interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function saveContactMessage(input: ContactMessageInput) {
  const receivedAt = new Date();
  const id = randomUUID();
  const year = String(receivedAt.getFullYear());
  const month = String(receivedAt.getMonth() + 1).padStart(2, '0');
  const directory = path.join(storageRoot, 'messages', year, month);
  await mkdir(directory, { recursive: true });

  const record = {
    id,
    receivedAt: receivedAt.toISOString(),
    ...input,
  };
  const filename = `${receivedAt.getTime()}-${id}.json`;
  await writeFile(path.join(directory, filename), `${JSON.stringify(record, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
  return record;
}
