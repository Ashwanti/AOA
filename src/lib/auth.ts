import { cookies } from 'next/headers';
import { createHash, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE = 'aoa_admin';

export function sessionToken() {
  const secret = process.env.ADMIN_PASSWORD ?? '';
  return createHash('sha256').update(secret).digest('hex');
}

export async function isAdminAuthenticated() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  const cookieValue = store.get(ADMIN_COOKIE)?.value;
  if (!cookieValue) return false;

  const expected = Buffer.from(sessionToken());
  const actual = Buffer.from(cookieValue);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
