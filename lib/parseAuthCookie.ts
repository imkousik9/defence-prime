import cookie from 'cookie';

export const parseAuthCookie = (req) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  return cookies['jwt'];
};
