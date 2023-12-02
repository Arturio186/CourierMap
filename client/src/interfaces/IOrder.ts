export default interface IOrder {
    num: number;
    products: Array<string>;
    address: string;
    courier_id: number | null;
    x: number;
    y: number;
}