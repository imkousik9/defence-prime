import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

export default async function watchLaterVideoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);
  const videoId = req.query['videoId'];

  if (!videoId || typeof videoId !== 'string') {
    return res.status(404).json({ message: 'videoId is not valid' });
  }

  if (req.method === 'POST') {
    try {
      const addedVideo = await prisma.watchLater.create({
        data: {
          id: nanoid(),
          userId: authUser,
          videoId: videoId
        }
      });

      return res.status(201).json(addedVideo);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const removedVideo = await prisma.watchLater.deleteMany({
        where: {
          userId: authUser,
          videoId: videoId
        }
      });

      return res.status(201).json(removedVideo);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
