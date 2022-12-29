import {HttpClient} from "../../helpers/axiosWrapper";
import User from "../../types/User";

export const userService = {
    getAll,
    getByEmail,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = "/api/user";

const httpClient = new HttpClient()

function getAll(): Promise<User[]> {
    return httpClient.get<User[]>({url: baseUrl});
}

function getById(id: string): Promise<User> {
    return httpClient.get<User>({url: `${baseUrl}/${id}`});
}

function getByEmail(email: string): Promise<User> {
    return httpClient.get<User>({url:`${baseUrl}/email${email}`});
}

function create(user: User): Promise<User>  {
    return httpClient.post<User>({url: baseUrl, payload: user});
}

function update(id: string, user: User): Promise<User>  {
    return httpClient.put<User>({url: `${baseUrl}/${id}`, payload: user});
}

function _delete(id: string): Promise<User>  {
    return httpClient.delete<User>({url: `${baseUrl}/${id}`});
}
