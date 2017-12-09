'use strict';

const Boom = require('boom');
const db = require('../../../db');

function verifyUniqueEmployee(request, h) {
    const { email } = request.payload;
    const isEmailTaken = db.getEmployeeByEmail(email);

    return isEmailTaken ? Boom.badRequest(`Employee with email ${email} already exists`) : h.response();
}

function verifyEmployeeExists(request, h) {
    const { slug } = request.payload;
    const employee = db.getEmployeeBySlug(slug);

    return employee ? h.response() : Boom.notFound(`Employee with slug ${slug} does not exist`);
}

function generateSlug(request) {
    const { firstName, lastName } = request.payload;
    const newSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const numOfSimilarSlugs = db.getEmployees()
        .filter(emp => emp.firstName === firstName && emp.lastName === lastName)
        .length;
    const ix = numOfSimilarSlugs && numOfSimilarSlugs + 1;

    return ix ? `${newSlug}-${ix}` : newSlug;
}

module.exports = {
    verifyUniqueEmployee,
    verifyEmployeeExists,
    generateSlug
};