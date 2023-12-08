interface IOrderProduct {
    name: string;
    price: number;
    quantity: number;
}

export default interface IOrder {
    id: number;
    address: string;
    client_name: string;
    client_phone: string;
    note: string;
    courier_id: number | null;
    map_x: number;
    map_y: number;
    products: Array<IOrderProduct>;
    total_price: number;
    status: number;
}