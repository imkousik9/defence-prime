import cookie from 'cookie';
import decode from 'jwt-decode';

export const protect = (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  const jwtCookies = cookies['jwt'];

  if (!jwtCookies) {
    return res
      .status(401)
      .send('You are not logged in! Please log in to get access.');
  }

  const jwt = decode(jwtCookies);

  return jwt;
};
