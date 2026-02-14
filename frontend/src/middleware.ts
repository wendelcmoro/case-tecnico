import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir arquivos estáticos e APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  const tempToken = request.nextUrl.searchParams.get('temp_token');
  if (tempToken) {
    const response = NextResponse.redirect(new URL('/dashboard/alunos', request.url));
    response.cookies.set('access_token', tempToken, {
      path: '/',
      maxAge: 60 * 60, // 1 hora
      httpOnly: true,
    });

    return response;
  }

  const token = request.cookies.get('access_token')?.value;
  // Se não houver token, redireciona para a página de login
  if ((!token || token == undefined) && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se houver token, redireciona para a dashboard
  if (token && (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard/alunos', request.url));
  }

  return NextResponse.next();
}
