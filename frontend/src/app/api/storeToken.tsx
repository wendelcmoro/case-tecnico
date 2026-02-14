'use server';

import { cookies } from 'next/headers';

interface StoreTokenRequest {
  access_token: string;
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: 'access_token',
    value: request.access_token,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
  });
}
