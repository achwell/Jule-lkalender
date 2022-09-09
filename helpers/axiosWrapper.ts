import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

export function setupAxios(axiosInstance: AxiosInstance): AxiosInstance {
    axios.defaults.baseURL = process.env.NEXTAUTH_URL;
    // axiosInstance.interceptors.request.use(onRequest, onRequestError);
    // axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

export const axiosWrapper = {
    get,
    post,
    put,
    delete: _delete
};

function get(url: string) {
    return axios.get(url).then(handleResponse);
}

function post(url: string, body: any) {
    const requestOptions = {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    return axios.post(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
    const requestOptions = {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    return axios.put(url, requestOptions).then(handleResponse);
}

function _delete(url: string) {
    return axios.delete(url).then(handleResponse);
}

function handleResponse(response: AxiosResponse) {
    const {data, status} = response
    if (status !== 400 && status !== 200 && status !== 201) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}
