import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function likeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);
  const videoId = req.query['videoId'];

  if (!videoId || typeof videoId !== 'string') {
    return res.status(404).json({ message: 'videoId is not valid' });
  }

  if (!authUser) {
    return res.end();
  }

  if (req.method === 'PUT') {
    try {
      const video = await prisma.video.findFirst({
        where: {
          id: videoId
        },
        select: {
          likes: {
            select: {
              id: true
            }
          }
        }
      });

      const isLiked = video?.likes?.some((like) => like?.id === authUser);

      let userLikeVideo;

      if (!isLiked) {
        userLikeVideo = await prisma.video.update({
          where: {
            id: videoId
          },
          data: {
            likes: {
              connect: [{ id: authUser }]
            }
          },
          select: {
            id: true,
            likes: {
              select: {
                id: true
              }
            }
          }
        });
      } else {
        userLikeVideo = await prisma.video.update({
          where: {
            id: videoId
          },
          data: {
            likes: {
              disconnect: [{ id: authUser }]
            }
          }
        });
      }

      return res.status(201).json(userLikeVideo);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
