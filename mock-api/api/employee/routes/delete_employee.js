'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');
const paramsValidator = require('../validation/delete_employee');

module.exports = {
    method: 'DELETE',
    path: `${endpoint}/{slug}`,
    config: {
        handler: function deleteEmployeeHandler(request) {
            const { slug } = request.params;

            try {
                db.removeEmployee(slug);
                return `Employee with slug ${slug} deleted`;
            } catch (err) {
                return Boom.notFound(err);
            }
        },
        validate: {
            params: paramsValidator
        }
    }
};