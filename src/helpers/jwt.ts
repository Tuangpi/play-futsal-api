import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from 'types';


export const signToken = (payload: JwtPayload, secret: string, expiresIn: string): string => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
