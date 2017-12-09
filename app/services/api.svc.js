import pathToRegexp from 'path-to-regexp';
import get from 'lodash/get';
import axios from 'axios';
import config from '../apiConfig';

async function launchRequest(params = { endpointName: '', pathParams: {} }, payload = {}) {
    const { endpointName, pathParams } = params;
    const apiUrl = generateEndpointURL(endpointName, pathParams);
    const method = getEndpointMethod(endpointName);

    try {
        const result = await callAxiosMethod(method)(apiUrl)(payload);

        if (result.status && result.status === 200) {
            return result.data;
        }

        throw result;
    } catch (err) {
        throw err;
    }
}

function callAxiosMethod(httpMethod) {
    const methods = {
        GET: url => () => axios.get(url),
        POST: url => payload => axios.post(url, payload),
        PUT: url => payload => axios.put(url, payload),
        DELETE: url => () => axios.delete(url)
    };

    return methods[httpMethod];
}

function generateEndpointURL(endpointName, pathParams = {}) {
    const prefix = get(config, 'APIPrefix', '');
    const { path } = getEndpoint(endpointName);
    let url = `/${prefix}/${path}`;
    const pathHasParams = url.indexOf(':') > -1;

    if (pathHasParams) {
        url = addPathParams(url, pathParams);
    }

    return url;
}

function addPathParams(url, pathParams = {}) {
    const toPath = pathToRegexp.compile(url);

    if (Object.keys(pathParams).length > 0) {
        url = toPath(pathParams);
    } else {
        console.error('URL contains path params, but no pathParams object was provided');
    }

    return url;
}

function getEndpoint(name) {
    const endpoint = get(config, `endpoints.${name}`);

    if (!endpoint) {
        console.error(`Endpoint ${name} is not defined in the API config`);
        return;
    }

    return endpoint;
}

function getEndpointMethod(endpointName) {
    const { method } = getEndpoint(endpointName);

    return method;
}

export default { request: launchRequest };