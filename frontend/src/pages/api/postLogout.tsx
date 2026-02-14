import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.setHeader('Set-Cookie', 'access_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');

  return res.status(200).json({ message: 'Logout successful' });
}
