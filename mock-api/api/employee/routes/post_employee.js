'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const queries = require('../queries/employees');
const payloadValidator = require('../validation/post_employee');

module.exports = {
    method: 'POST',
    path: `${endpoint}`,
    config: {
        pre: [
            { method: queries.verifyUniqueEmployee },
            { method: queries.generateSlug, assign: 'slug' }
        ],
        handler: function postEmployeeHandler(request) {
            const { slug } = request.pre;
            const newEntry = { ...request.payload, slug };

            try {
                const newEmployee = db.createEmployee(newEntry);

                return newEmployee;
            } catch (err) {
                return Boom.internal(err);
            }
        },
        validate: {
            payload: payloadValidator
        }
    }
};