import { omit } from 'lodash';
import { Response } from 'express';

const catchAsync = async (res: Response, callback: () => any) => {
  try {
    const response = await callback();
    return res.status(response?.statusCode).json(omit(response, ['statusCode']));
  } catch (err) {
    const error = { statusCode: 500, message: 'Internal Server Error', ...(err ?? {}), }
    return res.status(error?.statusCode || 500).json(omit(error, ['statusCode']));
  }
}

export default catchAsync;
