import config from '../config';

export default Object.freeze({
    APIPrefix: config.api.basePath,
    endpoints: {
        getEmployees: {
            path: 'employee',
            method: 'GET'
        },
        getEmployee: {
            path: 'employee/:slug',
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
            path: 'employee/:slug',
            method: 'DELETE'
        }
    }
});