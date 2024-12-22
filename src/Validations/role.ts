import Joi from 'joi';

const getRoles = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createRole = {
  body: Joi.object().keys({
    user_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

const updateRole = {
  body: Joi.object().keys({
    user_id: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deleteRole = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
}
