import cookie from 'cookie';

export const serializeCookie = (userSecret) => {
  const cookieSerialized = cookie.serialize('jwt', userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    path: '/'
  });
  return cookieSerialized;
};
