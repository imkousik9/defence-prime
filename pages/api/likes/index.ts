import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function likesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);

  if (!authUser) {
    return res.end();
  }

  if (req.method === 'GET') {
    try {
      const userLikedVideos = await prisma.user.findUnique({
        where: {
          id: authUser
        },
        select: {
          likes: {
            select: {
              id: true,
              title: true,
              channelName: true
            }
          }
        }
      });

      return res.status(201).json(userLikedVideos);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
