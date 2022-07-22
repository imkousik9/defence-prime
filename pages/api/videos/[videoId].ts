import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function videoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videoId = req.query['videoId'];

  if (!videoId || typeof videoId !== 'string') {
    return res.status(404).json({ message: 'videoId is not valid' });
  }

  const data = await prisma.videos.findFirst({
    where: {
      id: {
        equals: videoId
      }
    }
  });

  res.status(200).json(data);
}
