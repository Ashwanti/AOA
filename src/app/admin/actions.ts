'use server';

import { cookies } from 'next/headers';
import { ADMIN_COOKIE, sessionToken } from '@/lib/auth';

export type LoginState = {
  status: 'idle' | 'error';
  message: string;
};

export async function adminLogin(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  if (!process.env.ADMIN_PASSWORD) {
    return { status: 'error', message: 'ADMIN_PASSWORD is not configured on the server yet.' };
  }

  const password = String(formData.get('password') ?? '');
  if (password !== process.env.ADMIN_PASSWORD) {
    return { status: 'error', message: 'Incorrect password.' };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  return { status: 'idle', message: '' };
}

export async function adminLogout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
