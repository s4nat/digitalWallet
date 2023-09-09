import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    res.status(200).json({ message:  req.body })
}