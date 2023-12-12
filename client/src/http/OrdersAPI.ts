import { authHost } from ".";

export const GetOrders = async () => {
    const {data} = await authHost.get(`orders`);
    
    return data;
}

interface IOrderRequest {
    address: string;
    note: string;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    courier_id: number | null;
    products: Array<IOrderProductsRequest>;
}

interface IOrderProductsRequest {
    category_id: number;
    product_id: number;
    quantity: number;
}

export const AddOrder = async (order : IOrderRequest) => {
    const {data} = await authHost.post('orders/create', {
        order: order
    });

    return data;
}