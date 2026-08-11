import { copyFile, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const newsCategories = ['أخبار المجلس', 'فعاليات', 'بيانات صحفية', 'استثمار'] as const;

export interface StoredNewsItem {
  id: number;
  title: string;
  date: string;
  category: (typeof newsCategories)[number];
  summary: string;
  content?: string[];
  image: string;
  sourceUrl?: string;
  featured?: boolean;
}

const projectRoot = process.cwd();
export const storageRoot = path.resolve(projectRoot, process.env.CONTENT_STORAGE_DIR || 'storage');
export const imageStorageRoot = path.join(storageRoot, 'images');
const newsFile = path.join(storageRoot, 'news.json');
const backupRoot = path.join(storageRoot, 'backups');
const initialNewsFile = path.join(projectRoot, 'public', 'content', 'news.json');

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validUrl(value: string, allowLocal = false) {
  if (allowLocal && value.startsWith('/')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateNews(input: unknown): StoredNewsItem[] {
  if (!Array.isArray(input) || input.length > 500) throw new Error('قائمة الأخبار غير صحيحة.');

  const ids = new Set<number>();
  let featuredCount = 0;
  const news = input.map((raw) => {
    const item = (raw ?? {}) as Partial<StoredNewsItem>;
    const id = Number(item.id);
    const title = cleanText(item.title, 180);
    const date = cleanText(item.date, 10);
    const category = item.category;
    const summary = cleanText(item.summary, 700);
    const image = cleanText(item.image, 2000);
    const sourceUrl = cleanText(item.sourceUrl, 2000);
    const content = Array.isArray(item.content)
      ? item.content.map((paragraph) => cleanText(paragraph, 5000)).filter(Boolean).slice(0, 20)
      : [];

    if (!Number.isSafeInteger(id) || id < 1 || ids.has(id)) throw new Error('رقم الخبر غير صحيح أو مكرر.');
    if (title.length < 3 || summary.length < 10 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('يرجى استكمال عنوان الخبر وتاريخه وملخصه.');
    if (!newsCategories.includes(category as StoredNewsItem['category'])) throw new Error('تصنيف الخبر غير صحيح.');
    if (!validUrl(image, true)) throw new Error('صورة الخبر غير صحيحة.');
    if (sourceUrl && !validUrl(sourceUrl)) throw new Error('رابط المصدر غير صحيح.');

    ids.add(id);
    if (item.featured) featuredCount += 1;
    return {
      id,
      title,
      date,
      category: category as StoredNewsItem['category'],
      summary,
      content,
      image,
      ...(sourceUrl ? { sourceUrl } : {}),
      ...(item.featured ? { featured: true } : {}),
    };
  });

  if (featuredCount > 1) throw new Error('يمكن اختيار خبر مميّز واحد فقط.');
  return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function ensureStorage() {
  await mkdir(storageRoot, { recursive: true });
  await mkdir(imageStorageRoot, { recursive: true });
  await mkdir(backupRoot, { recursive: true });
}

async function readNewsFile(file: string) {
  return validateNews(JSON.parse(await readFile(file, 'utf8')));
}

export async function loadStoredNews(): Promise<StoredNewsItem[] | null> {
  await ensureStorage();
  try {
    return await readNewsFile(newsFile);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== 'ENOENT') throw error;
  }

  try {
    const initialNews = await readNewsFile(initialNewsFile);
    await writeFile(newsFile, `${JSON.stringify(initialNews, null, 2)}\n`, 'utf8');
    return initialNews;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

async function pruneBackups() {
  const backups = (await readdir(backupRoot)).filter((name) => name.endsWith('.json')).sort().reverse();
  await Promise.all(backups.slice(20).map((name) => unlink(path.join(backupRoot, name))));
}

export async function saveStoredNews(input: unknown) {
  await ensureStorage();
  const news = validateNews(input);

  try {
    await copyFile(newsFile, path.join(backupRoot, `news-${Date.now()}.json`));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }

  await writeFile(newsFile, `${JSON.stringify(news, null, 2)}\n`, 'utf8');
  await pruneBackups();
  return news;
}
