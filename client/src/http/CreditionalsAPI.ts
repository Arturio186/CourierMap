import { authHost, host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email : string, password : string) => {
    const {data} = await host.post('creditionals/registartion', {
        email, password
    });

    localStorage.setItem('token', data.token);

    return jwtDecode(data.token);
}

export const authorization = async (email : string, password : string) => {
    const {data} = await host.post('creditionals/authorization', {
        email, password
    });

    const result = {
        status: data.status,
        message: data.message.token ? jwtDecode(data.message.token) : data.message
    }

    return result;
}

export const authentication = async () => {
    const {data} = await authHost.get('creditionals/authentication');

    localStorage.setItem('token', data.token);

    return jwtDecode(data.token);
}
