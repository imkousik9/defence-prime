import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

export default async function playlistsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);

  if (!authUser) {
    return res.end();
  }

  if (req.method === 'POST') {
    try {
      const { playlistName } = req.body;

      if (!playlistName) {
        throw new Error('name and must be provided.');
      }

      const newPlaylist = await prisma.playlist.create({
        data: {
          id: nanoid(),
          name: playlistName,
          userId: authUser
        }
      });

      return res.status(201).json(newPlaylist);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'GET') {
    try {
      const playlists = await prisma.playlist.findMany({
        where: {
          userId: authUser
        },
        include: {
          videos: {
            select: {
              id: true
            }
          }
        }
      });

      return res.status(201).json(playlists);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
