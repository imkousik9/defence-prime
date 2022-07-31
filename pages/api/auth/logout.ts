import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const cookies = cookie.parse(req.headers.cookie ?? '');
      const jwtCookies = cookies['jwt'];

      if (!jwtCookies) {
        return res.status(200).end();
      }

      const cookieSerialized = cookie.serialize('jwt', '', {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1,
        httpOnly: true,
        path: '/'
      });
      res.setHeader('Set-Cookie', cookieSerialized);
      return res.status(200).end();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.send('Method not allowed.');
}
