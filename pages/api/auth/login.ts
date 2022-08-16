import type { NextApiRequest, NextApiResponse } from 'next';
import { createToken, serializeCookie } from 'lib';
import { prisma } from 'lib/prisma';
import bcrypt from 'bcrypt';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | string | null>
) {
  const { email, password } = req.body;
  if (req.method === 'POST') {
    try {
      if (!email || !password) {
        throw new Error('Please provide email and password!');
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user?.id);
          const cookieSerialized = serializeCookie(token);
          res.setHeader('Set-Cookie', cookieSerialized);

          return res.status(200).json({
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email
          });
        } else {
          return res.status(401).send('Incorrect email or password');
        }
      } else {
        return res.status(401).send('Incorrect email or password');
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
