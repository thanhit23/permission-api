import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status-codes';

import ApiError from '@/utils/ApiError';
import User from '@/model/Users';

const verifyCallback = (req: Request, resolve: (value?: unknown) => void, reject: (reason?: any) => void, role: string) => async (err: any, user: User | undefined, info: any) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  console.log(role);

  // if (role.length) {
  //   if (user.role !== role) {
  //     return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  //   }
  // }

  resolve();
};

const authenticate =
  (role = 'user') =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, role))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default authenticate;