import { Request } from 'express';
import { Schema, ObjectPropertiesSchema } from 'joi';

type ObjectPick = { [key: string]: string | number } | Schema | Request | ObjectPropertiesSchema;

const pick = (object: ObjectPick, keys: string[]) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      (obj as any)[key] = (object as any)[key];
    }
    return obj;
  }, {});
};

export default pick;
