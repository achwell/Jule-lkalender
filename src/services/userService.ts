import {axiosWrapper} from "../../helpers/axiosWrapper";
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

function getAll(): Promise<User[]> {
    return axiosWrapper.get(baseUrl);
}

function getById(id: string): Promise<User> {
    return axiosWrapper.get(`${baseUrl}/${id}`);
}

function getByEmail(email: string): Promise<User> {
    return axiosWrapper.get(`${baseUrl}/email${email}`);
}

function create(user: User): Promise<User>  {
    return axiosWrapper.post(baseUrl, user);
}

function update(id: string, user: User): Promise<User>  {
    return axiosWrapper.put(`${baseUrl}/${id}`, user);
}

function _delete(id: string): Promise<User>  {
    return axiosWrapper.delete(`${baseUrl}/${id}`);
}
