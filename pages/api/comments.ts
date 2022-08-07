import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function commentHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = protect(req, res);

    const { text, videoId } = req.body;

    try {
      if (!text || !videoId) {
        throw new Error('text and must videoId be provided.');
      }

      const newComment = await prisma.comment.create({
        data: {
          id: nanoid(),
          text: text,
          videoId: videoId,
          userId: user
        },
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
      });

      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({});

      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
