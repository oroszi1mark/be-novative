'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    slug: Joi.string().required()
});