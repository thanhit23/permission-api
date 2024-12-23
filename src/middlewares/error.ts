import { Response, NextFunction } from 'express';
import httpStatus from 'http-status-codes';

import ApiError from '@/utils/ApiError';
import config from '@/config/config';

export const errorConverter = (err, _, __, next: NextFunction) => {
  let error = err;
  
  if (!(error instanceof ApiError)) {
    const statusCode =
      error?.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, _, res: Response, __) => {
  let { statusCode, message } = err;
  
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: false,
    data: null,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};
