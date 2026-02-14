import axiosInterface from "./axiosInterface";

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const response = await axiosInterface.post(
    "/company/logout",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + req.cookies.access_token,
      },
    },
  );

  return res.status(200).json(response?.data);
}
