import IOrder from "interfaces/IOrder";
import ICourier from "interfaces/ICourier";

export default interface IOrdersProps {
    orders: Array<IOrder>;
    targetCourier: ICourier | null;
    openOrderModal: (id: number) => void;
}