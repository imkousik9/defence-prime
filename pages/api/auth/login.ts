import type { NextApiRequest, NextApiResponse } from 'next';
import { createToken, serializeCookie } from 'lib';
import { prisma } from 'lib/prisma';
import bcrypt from 'bcrypt';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  if (req.method === 'POST') {
    try {
      if (!email || !password) {
        throw new Error('Email and password must be provided.');
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user);
          const cookieSerialized = serializeCookie(token);
          res.setHeader('Set-Cookie', cookieSerialized);

          return res.status(200).json(user);
        }
      } else {
        throw new Error('User does not exist.');
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
