import config from '../config';

export default Object.freeze({
    //APIPrefix: config.api.basePath,
    APIPrefix: 'benovative',
    endpoints: {
        getEmployees: {
            path: 'employee',
            method: 'GET'
        },
        getEmployee: {
            path: 'employee/:id',
            method: 'GET'
        },
        postEmployee: {
            path: 'employee',
            method: 'POST'
        },
        putEmployee: {
            path: 'employee',
            method: 'PUT'
        },
        deleteEmployee: {
            path: 'employee/:id',
            method: 'DELETE'
        }
    }
});