import { authHost, host } from ".";
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

export const Registration = async (name : string, surname : string, email : string, password : string) => {
    const {data} = await host.post('creditionals/registartion', {
        name, surname, email, password, role: 0
    });

    return ProccesResponse(data);
}

export const Authorization = async (email : string, password : string) => {
    const {data} = await host.post('creditionals/authorization', {
        email, password
    });

    return ProccesResponse(data);
}

export const Authentication = async () => {
    const {data} = await authHost.get('creditionals/authentication');

    return ProccesResponse(data);
}
