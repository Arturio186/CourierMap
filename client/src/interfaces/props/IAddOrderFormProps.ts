import ICourier from "interfaces/ICourier";

export default interface IAddOrderFormProps {
    map_x: number;
    map_y: number;
    visible: boolean;
    couriers: Array<ICourier>
}