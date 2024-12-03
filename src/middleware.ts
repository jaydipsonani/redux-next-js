import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname, search, origin } = request.nextUrl;
  const token = request.cookies.get('olysimhelpsupporttoken');
  const user_data = request.cookies.get('user_data');
  const language = request.cookies.get('language');
  const currency = request.cookies.get('currency');

  // List of protected routes
  const protectedRoutes = [
    '/profile',
    '/reservations',
    '/reviews',
    '/wishlists',
  ]; // Add more paths as needed

  const redirectUrl = new URL('/auth/signin', origin);
  redirectUrl.searchParams.set('redirect', `${pathname}${search}`);

  if (
    (protectedRoutes.some((route) => pathname.startsWith(route)) ||
      (pathname.startsWith('/list/tour-details/bookingConfirmation') &&
        request.nextUrl.searchParams.has('tour_id') &&
        request.nextUrl.searchParams.has('calendar_id'))) &&
    !(token && user_data)
  ) {
    return NextResponse.redirect(redirectUrl);
  }

  if (token && !user_data) {
    response.cookies.set('olysimhelpsupporttoken', '', { path: '/', maxAge: -1 });
  } else if (!token && user_data) {
    response.cookies.set('user_data', '', { path: '/', maxAge: -1 });
  }

  // If the user is authenticated (token and user_data exist) and is trying to access auth pages, redirect them to the home page
  if (token && user_data && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If 'language' cookie is not set, set it to 'en'
  if (!language) {
    response.cookies.set('language', 'en', { path: '/' });
  }

  // If 'currency' cookie is not set, set it to 'USD'
  if (!currency) {
    response.cookies.set('currency', 'USD', { path: '/' });
  }

  return response;
}
