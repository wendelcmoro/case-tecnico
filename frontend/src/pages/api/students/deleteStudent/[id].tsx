import axiosInterface from '../../axiosInterface';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const id = req.query.id;
  const response = await axiosInterface.delete('/students/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.access_token,
      Accept: 'application/json',
    },
  });

  return res.status(200).json(response?.data);
}
