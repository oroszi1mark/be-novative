'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const paramsValidator = require('../validation/delete_employee');

module.exports = {
    method: 'DELETE',
    path: `${endpoint}/{id}`,
    config: {
        handler: function deleteEmployeeHandler(request) {
            const { id } = request.params;

            try {
                db.removeEmployee(id);
                return `Employee with id ${id} deleted`;
            } catch (err) {
                return Boom.notFound(err);
            }
        },
        validate: {
            params: paramsValidator
        }
    }
};