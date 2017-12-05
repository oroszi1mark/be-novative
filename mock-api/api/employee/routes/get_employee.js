'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const paramsValidator = require('../validation/get_employee');

module.exports = {
    method: 'GET',
    path: `${endpoint}/{id}`,
    config: {
        handler: function getEmployeeHandler(request) {
            const { id } = request.params;
            const employee = db.getEmployeeById(id);

            if (!employee) {
                return Boom.notFound(`Employee with id ${id} not found`);
            }

            return employee;
        },
        validate: {
            params: paramsValidator
        }
    }
};