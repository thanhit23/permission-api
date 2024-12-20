import Joi from 'joi';

const getPermissions = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createPermission = {
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

const updatePermission = {
  body: Joi.object().keys({
    name: Joi.string(),
  }),
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deletePermission = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
}
