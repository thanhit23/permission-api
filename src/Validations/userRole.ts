import Joi from 'joi';

const getUserRoles = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createUserRole = {
  body: Joi.object().keys({
    role_id: Joi.number().required(),
    user_id: Joi.number().required(),
    store_id: Joi.number(),
  }),
};

const updateUserRole = {
  body: Joi.object().keys({
    role_id: Joi.number(),
    user_id: Joi.number(),
    store_id: Joi.number(),
  }),
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deleteUserRole = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  getUserRoles,
  deleteUserRole,
  updateUserRole,
  createUserRole,
}
