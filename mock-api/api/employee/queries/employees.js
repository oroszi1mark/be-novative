'use strict';

const Boom = require('boom');
const db = require('../../../db');

function verifyUniqueEmployee(request, h) {
    const { email } = request.payload;
    const isEmailTaken = db.getEmployeeByEmail(email);

    return isEmailTaken ? Boom.badRequest(`Employee with email ${email} already exists`) : h.response();
}

function verifyEmployeeExists(request, h) {
    const { id } = request.payload;
    const employee = db.getEmployeeById(id);

    return employee ? h.response() : Boom.notFound(`Employee with id ${id} does not exist`);
}

function generateSlug(request) {
    const { firstName, lastName } = request.payload;

    return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
}

module.exports = {
    verifyUniqueEmployee,
    verifyEmployeeExists,
    generateSlug
};