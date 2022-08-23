import cookie from 'cookie';
import type { NextApiRequest } from 'next';

export type History = {
  req?: NextApiRequest;
  userId: string;
  id: string;
  title: string;
  channelName: string;
};

export const getHistory = (req: NextApiRequest, userId: string) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  if (cookies[`history:${userId}`])
    return JSON.parse(cookies[`history:${userId}`]);

  return [];
};

export const addHistory = ({
  req,
  userId,
  id,
  title,
  channelName
}: History) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  console.log(cookies[`history:${userId}`]);
  let history = [];

  if (cookies[`history:${userId}`]) {
    history = JSON.parse(cookies[`history:${userId}`]);
  }

  const item = {
    id,
    userId,
    title,
    channelName
  };

  history.push(item);

  const cookieSerialized = cookie.serialize(
    `history:${userId}`,
    JSON.stringify(history),
    {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1,
      httpOnly: true,
      path: '/'
    }
  );
  return cookieSerialized;
};
