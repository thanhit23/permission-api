import Joi, { Schema, ObjectPropertiesSchema } from 'joi';
import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import pick from '@/utils/pick';

const validate = (schema: Schema | ObjectPropertiesSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: 'Error validate',
      errors: error.details.map((details) => ({ key: details?.context?.key, message: details.message }))
    })
    return next();
  }
  Object.assign(req, value);
  return next();
};

export default validate;
