'use strict';

const Boom = require('boom');
const endpoint = require('../endpoint');
const db = require('../../../db');

module.exports = {
    method: 'GET',
    path: endpoint,
    config: {
        handler: function getEmployeesHandler() {
            const employees = db.getEmployees();

            if (!employees.length) {
                return Boom.notFound('No employees found');
            }

            return employees;
        }
    }
};