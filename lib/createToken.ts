import { sign } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const createToken = (user: string) => {
  try {
    return sign(user, secret);
  } catch (error) {
    console.log(error.message);
  }
};
