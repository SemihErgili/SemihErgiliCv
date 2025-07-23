'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'admin-session';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // Use environment variables for credentials, with fallbacks for local dev
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (email === adminEmail && password === adminPassword) {
    const sessionData = {
      isAuthenticated: true,
      user: { email: adminEmail },
    };

    // Set a secure, HTTP-only cookie
    cookies().set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    redirect('/admin/dashboard');
  }

  // Return an error message if login fails
  return { error: 'Geçersiz e-posta veya şifre.' };
}

export async function logout() {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect('/admin/login');
}

export async function getSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}
