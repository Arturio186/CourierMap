import { authHost } from ".";

export const GetOrders = async () => {
    const {data} = await authHost.get(`orders`);
    
    return data;
}