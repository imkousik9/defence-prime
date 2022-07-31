import cookie from 'cookie';

export const serializeCookie = (userSecret) => {
  const cookieSerialized = cookie.serialize('jwt', userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: true,
    path: '/'
  });
  return cookieSerialized;
};
