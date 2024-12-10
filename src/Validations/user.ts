import Joi from 'joi';

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export default {
  getUsers,
}
