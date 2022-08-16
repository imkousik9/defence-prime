import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function videoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const videoId = req.query['videoId'];

    if (!videoId || typeof videoId !== 'string') {
      return res.status(404).json({ message: 'videoId is not valid' });
    }

    try {
      const data = await prisma.video.findFirst({
        where: {
          id: {
            equals: videoId
          }
        },
        include: {
          comments: {
            select: {
              id: true,
              text: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        }
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
