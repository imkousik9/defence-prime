import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function watchLaterVideosHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);

  if (!authUser) {
    return res.end();
  }

  if (req.method === 'GET') {
    try {
      const addedVideos = await prisma.watchLater.findMany({
        where: {
          userId: authUser
        },
        select: {
          video: {
            select: {
              id: true,
              channelName: true,
              title: true
            }
          }
        }
      });

      return res.status(201).json(addedVideos);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
