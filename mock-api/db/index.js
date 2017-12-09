'use strict';

const employees = require('../data/employees');

function Database(db = []) {
    function createEmployee(formData) {
        const { slug } = formData;

        db = db.concat([formData]);

        const success = getEmployeeBySlug(slug);

        if (success) {
            return success;
        } else {
            throw 'The employee could not be added due to a server error';
        }
    }

    function getEmployees() {
        return db;
    }

    function getEmployeeBySlug(slug) {
        return db.find(employee => employee.slug === slug);
    }

    function getEmployeeByEmail(email) {
        return db.find(employee => employee.email === email);
    }

    function addEmployee(employee) {
        db = db.concat([employee]);
    }

    function updateEmployee(employee) {
        const newDb = db.slice();
        const ix = newDb.findIndex(emp => emp.slug === employee.slug);

        newDb.splice(ix, 1, employee);
        db = newDb;

        const updatedEmployee = getEmployeeById(employee.slug);
        const success = updatedEmployee === employee;

        if (success) {
            return updatedEmployee;
        } else {
            throw 'The employee could not be updated due to a server error';
        }
    }

    function removeEmployee(slug) {
        const newDb = db.slice();
        const ix = newDb.findIndex(emp => emp.slug === slug);

        if (ix < 0) {
            throw `Employee with slug ${slug} does not exist`;
        }

        newDb.splice(ix, 1);
        db = newDb;
    }

    return {
        createEmployee,
        getEmployees,
        getEmployeeBySlug,
        getEmployeeByEmail,
        addEmployee,
        updateEmployee,
        removeEmployee
    };
}

module.exports = new Database(employees);