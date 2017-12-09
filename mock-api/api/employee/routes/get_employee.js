'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const paramsValidator = require('../validation/get_employee');

module.exports = {
    method: 'GET',
    path: `${endpoint}/{slug}`,
    config: {
        handler: function getEmployeeHandler(request) {
            const { slug } = request.params;
            const employee = db.getEmployeeBySlug(slug);

            if (!employee) {
                return Boom.notFound(`Employee with slug ${slug} not found`);
            }

            return employee;
        },
        validate: {
            params: paramsValidator
        }
    }
};