import axiosInterface from '../axiosInterface';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  type: string;
  name: string;
  id: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const response = await axiosInterface.post('/teaching-environments', req.body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access_token,
      Accept: 'application/json',
    },
  });

  return res.status(200).json(response?.data);
}
