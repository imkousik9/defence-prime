import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function videosHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.videos.findMany({});
  res.status(200).json(data);
}
