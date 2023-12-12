import IAddOrderProduct from "./IAddOrderProduct";

export default interface IAddOrderField {
    address: string;
    note: string;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    courier_id: number | null;
    products: Array<IAddOrderProduct>;
}