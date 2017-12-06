'use strict';

const Joi = require('joi');
const postValidation = require('./post_employee');

module.exports = postValidation.concat(Joi.object({
    id: Joi.number().required()
}));