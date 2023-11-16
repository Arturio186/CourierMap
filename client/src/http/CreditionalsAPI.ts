import { authHost, host } from "./index";
import { jwtDecode } from "jwt-decode";

const ProccesResponse = (data : any) => {
    let message = data.message

    if (data.message.token) {
        localStorage.setItem('token', data.message.token)
        message = jwtDecode(data.message.token)
    }

    const result = {
        status: data.status,
        message: message
    }

    return result
}

export const registration = async (email : string, password : string) => {
    const {data} = await host.post('creditionals/registartion', {
        email, password
    });

    return ProccesResponse(data);
}

export const authorization = async (email : string, password : string) => {
    const {data} = await host.post('creditionals/authorization', {
        email, password
    });

    return ProccesResponse(data);
}

export const authentication = async () => {
    const {data} = await authHost.get('creditionals/authentication');

    return ProccesResponse(data);
}
