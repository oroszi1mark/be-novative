'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const queries = require('../queries/employees');
const payloadValidator = require('../validation/put_employee');

module.exports = {
    method: 'PUT',
    path: `${endpoint}`,
    config: {
        pre: [
            { method: queries.verifyEmployeeExists },
            { method: queries.generateSlug, assign: 'slug' }
        ],
        handler: function putEmployeeHandler(request) {
            const { slug } = request.pre;
            const updatedEntry = { ...request.payload, slug };

            try {
                const updatedEmployee = db.updateEmployee(updatedEntry);

                return updatedEmployee;
            } catch (err) {
                return Boom.internal(err);
            }
        },
        validate: {
            payload: payloadValidator
        }
    }
};