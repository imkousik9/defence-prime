import type { NextApiRequest, NextApiResponse } from 'next';
import { createToken, serializeCookie } from 'lib';
import { prisma } from 'lib/prisma';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | string | null>
) {
  const { email, password, firstName, lastName } = req.body;

  if (req.method === 'POST') {
    try {
      if (!email || !password || !firstName || !lastName) {
        throw new Error(
          'Email, password, FirstName and LastName must be provided.'
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      if (user) {
        throw new Error('User already exists.');
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const newUser = await prisma.user.create({
        data: {
          id: nanoid(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword
        }
      });

      const token = createToken(newUser?.id);
      const cookieSerialized = serializeCookie(token);
      res.setHeader('Set-Cookie', cookieSerialized);

      return res.status(200).json({
        id: newUser?.id,
        firstName: newUser?.firstName,
        lastName: newUser?.lastName,
        email: newUser?.email
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
