import { prisma } from 'lib/prisma';
import { protect } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function playlistHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authUser = protect(req, res);
  const playlistId = req.query['playlistId'];

  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(404).json({ message: 'playlistId is not valid' });
  }

  if (!authUser) {
    return res.end();
  }

  if (req.method === 'GET') {
    try {
      const playlist = await prisma.playlist.findUnique({
        where: {
          id: playlistId
        },
        include: {
          videos: {
            select: {
              id: true,
              title: true,
              channelName: true,
              views: true,
              avatar: true,
              uploadedOn: true
            }
          }
        }
      });

      return res.status(201).json(playlist);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'PUT') {
    try {
      const { videoId } = req.body;

      if (!videoId) {
        throw new Error('videoId and must be provided.');
      }

      const updatedPlaylist = await prisma.playlist.update({
        where: {
          id: playlistId
        },
        data: {
          videos: {
            connect: [{ id: videoId }]
          }
        },
        include: {
          videos: {
            select: {
              id: true
            }
          }
        }
      });

      return res.status(201).json(updatedPlaylist);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { videoId } = req.body;

      if (!videoId) {
        throw new Error('videoId and must be provided.');
      }

      const updatedPlaylist = await prisma.playlist.update({
        where: {
          id: playlistId
        },
        data: {
          videos: {
            disconnect: [{ id: videoId }]
          }
        },
        include: {
          videos: {
            select: {
              id: true
            }
          }
        }
      });

      return res.status(201).json(updatedPlaylist);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      const removedPlaylist = await prisma.playlist.delete({
        where: {
          id: playlistId
        }
      });

      return res.status(201).json(removedPlaylist);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
