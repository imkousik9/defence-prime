import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function videosHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.video.findMany({
      include: {
        category: true
      }
    });

    res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
