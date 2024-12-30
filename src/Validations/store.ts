import Joi from 'joi';

const getStores = {
  query: Joi.object().keys({
    name: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createStore = {
  body: Joi.object().keys({
    owner_id: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

const updateStore = {
  body: Joi.object().keys({
    owner_id: Joi.number(),
    name: Joi.string(),
    address: Joi.string(),
  }),
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

const deleteStore = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};

export default {
  getStores,
  createStore,
  updateStore,
  deleteStore,
}
