import axiosInterface from "./axiosInterface";

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  userId: number;
  username: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const response = await axiosInterface.get("/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + req.cookies.access_token,
      Accept: "application/json",
    },
  });

  return res.status(200).json(response?.data);
}
