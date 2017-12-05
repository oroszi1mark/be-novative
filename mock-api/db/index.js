'use strict';

const employees = require('../data/employees');

function Database(db = []) {
    function getEmployees() {
        return db;
    }

    function getEmployeeById(id) {
        return db.find(employee => employee.id === Number(id));
    }

    function addEmployee(employee) {
        db = db.concat([employee]);
    }

    function updateEmployee(employee) {
        const newDb = db.slice();
        const ix = newDb.findIndex(emp => emp.id === employee.id);

        newDb.splice(ix, 1, employee);
        db = newDb;
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
        getEmployees,
        getEmployeeById,
        addEmployee,
        updateEmployee,
        removeEmployee
    };
}

module.exports = new Database(employees);