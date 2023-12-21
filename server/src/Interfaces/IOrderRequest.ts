import IOrderProductsRequest from "./IOrderProductsRequest";

export default interface IOrderRequest {
    address: string;
    note: string;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    courier_id: number | null;
    products: Array<IOrderProductsRequest>;
}
