import axios, {AxiosRequestConfig, AxiosResponse, AxiosInstance, HeadersDefaults} from 'axios'

export interface IHttpClientRequestParameters<T> {
    url: string
    payload?: T
}
export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
}

export class HttpClient implements IHttpClient {
    delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url } = parameters
            const options: AxiosRequestConfig = {
                headers: {}
            }
            axios
                .delete(url, options)
                .then((response: AxiosResponse<T>) => resolveResponse(resolve, response))
                .catch((response: any) => reject(response))
        })
    }

    get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url } = parameters
            const options: AxiosRequestConfig = {
                headers: {}
            }
            axios
                .get(url, options)
                .then((response: AxiosResponse<T>) => resolveResponse(resolve, response))
                .catch((response: any) => reject(response))
        })
    }
    post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload } = parameters
            const options: AxiosRequestConfig = {
                headers: {}
            }
            if (!payload.id)  {
                payload.id = undefined
            }
            axios
                .post(url, payload, options)
                .then((response: AxiosResponse<T>) => resolveResponse(resolve, response))
                .catch((response: any) => reject(response))
        })
    }
    put<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload } = parameters
            const options: AxiosRequestConfig = {
                headers: {}
            }

            axios
                .put(url, payload, options)
                .then((response: AxiosResponse<T>) => resolveResponse(resolve, response))
                .catch((response: any) => reject(response))
        })
    }

}
function resolveResponse<T>(resolve: <T>(value: (PromiseLike<T> | T)) => void, response: AxiosResponse<T>) {
    const {data, status} = response
    if (status !== 400 && status !== 200 && status !== 201) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return resolve(response.data as T);
}

export function setupAxios(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.defaults.baseURL = process.env.NEXTAUTH_URL;
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
    axiosInstance.defaults.headers.put['Content-Type'] = 'application/json';
    return axiosInstance;
}
