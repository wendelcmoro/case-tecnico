import axiosInterface from '../axiosInterface';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  name: string;
  id: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.body.id !== 0) {
    const response = await axiosInterface.put('/students', req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.cookies.access_token,
        Accept: 'application/json',
      },
    });

    return res.status(200).json(response?.data);
  }

  const { id, ...withoutId } = req.body;

  const response = await axiosInterface.post('/students', withoutId, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access_token,
      Accept: 'application/json',
    },
  });

  return res.status(200).json(response?.data);
}
