import { Response } from 'express';

export type ResponseExpress = Response<any, Record<string, any>>;

export interface ResponseDefault<T = any> {
  status: boolean;
  statusCode?: number;
  error: boolean;
  data: T;
  message: string;
}
