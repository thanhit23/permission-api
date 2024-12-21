import Joi from 'joi';

const getRolePermissions = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createRolePermission = {
  body: Joi.object().keys({
    role_id: Joi.number(),
    permission_id: Joi.number(),
  }),
};

const updateRolePermission = {
  body: Joi.object().keys({
    role_id: Joi.number(),
    permission_id: Joi.number(),
  }),
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deleteRolePermission = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  getRolePermissions,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
}
