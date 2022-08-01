import type { NextApiRequest, NextApiResponse } from 'next';
import { protect } from 'lib';
import { prisma } from 'lib/prisma';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const authUser = protect(req, res);

      const user = await prisma.user.findUnique({
        where: {
          id: authUser
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      });

      if (!user) {
        throw new Error('User does not exist.');
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
