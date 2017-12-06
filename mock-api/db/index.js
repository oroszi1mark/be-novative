'use strict';

const employees = require('../data/employees');

function Database(db = []) {
    function getNextId() {
        return db.reduce(function findHighestId(acc, cur) {
            return cur.id > acc ? cur.id : acc;
        }, 0) + 1;
    }

    function createEmployee(formData) {
        const id = getNextId();
        const newEmployee = { ...formData, id };

        db = db.concat([newEmployee]);

        const success = getEmployeeById(id);

        if (success) {
            return success;
        } else {
            throw 'The employee could not be added due to a server error';
        }
    }

    function getEmployees() {
        return db;
    }

    function getEmployeeById(id) {
        return db.find(employee => employee.id === Number(id));
    }

    function getEmployeeByEmail(email) {
        return db.find(employee => employee.email === email);
    }

    function addEmployee(employee) {
        db = db.concat([employee]);
    }

    function updateEmployee(employee) {
        const newDb = db.slice();
        const ix = newDb.findIndex(emp => emp.id === employee.id);

        newDb.splice(ix, 1, employee);
        db = newDb;

        const updatedEmployee = getEmployeeById(employee.id);
        const success = updatedEmployee === employee;

        if (success) {
            return updatedEmployee;
        } else {
            throw 'The employee could not be updated due to a server error';
        }
    }

    function removeEmployee(id) {
        const newDb = db.slice();
        const ix = newDb.findIndex(emp => emp.id === Number(id));

        if (isNaN(ix)) {
            throw `Employee with id ${id} does not exist`;
        }

        newDb.splice(ix, 1);
        db = newDb;
    }

    return {
        createEmployee,
        getEmployees,
        getEmployeeById,
        getEmployeeByEmail,
        addEmployee,
        updateEmployee,
        removeEmployee
    };
}

module.exports = new Database(employees);