import ICourier from "interfaces/ICourier";

export default interface ICourierMenuSelectProps {
    targetCourier: ICourier | null;
    setTargetCourier: React.Dispatch<React.SetStateAction<ICourier | null>>;
    setFocusOnCoord: (x: number, y: number) => void;
    couriers: Array<ICourier>;
}