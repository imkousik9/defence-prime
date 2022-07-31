import sign from 'jwt-encode';

const secret = process.env.JWT_SECRET;

export const createToken = (user) => {
  user.password = undefined;

  return sign(user, secret);
};
