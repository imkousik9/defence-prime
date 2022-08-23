import { parseAuthCookie } from 'lib';
import { decode } from 'jsonwebtoken';

export const protect = (req, res) => {
  const jwtCookies = parseAuthCookie(req);

  if (!jwtCookies) {
    return res
      .status(401)
      .send('You are not logged in! Please log in to get access.');
  }

  const jwt = decode(jwtCookies);

  return jwt;
};
