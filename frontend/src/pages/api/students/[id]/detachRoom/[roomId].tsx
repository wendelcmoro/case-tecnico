import axiosInterface from '../../../axiosInterface';

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  id: number;
  name: string;
  teachingEnvironments: [];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const studentId = req.query.id;
  const roomId = req.query.roomId;
  const response = await axiosInterface.delete(
    'students/' + studentId + '/teaching_environments/' + roomId,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.cookies.access_token,
        Accept: 'application/json',
      },
    },
  );

  return res.status(200).json(response?.data);
}
