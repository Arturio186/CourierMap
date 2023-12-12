import React from 'react';

import classes from './CourierMenuSelect.module.scss'

import ICourierMenuSelectProps from 'interfaces/props/ICourierMenuSelectProps';

const CourierMenuSelect : React.FC<ICourierMenuSelectProps> = ({targetCourier, setTargetCourier, couriers, setFocusOnCoord}) => {
    const setFocusOnCourier = (id : string) => {
        if (Number(id) === -1) {
            setTargetCourier(null);
            return;
        }

        couriers.forEach((courier) => {
            if (courier.id === Number(id)) {
                setTargetCourier(courier);
                setFocusOnCoord(courier.x, courier.y);
            }
        })
    }

    return (
        <div className={classes.row}>
            <div>
                <h3>Заказы</h3>
                {targetCourier && <p>Курьер: {targetCourier.name} {targetCourier.surname}</p>}
            </div>
            
            <form className={classes.menu}>
                <select name="courier" id="courier" onChange={(e) => setFocusOnCourier(e.target.value)}>
                    <option value="-1">Все курьеры</option>
                    {couriers.map((courier) => { 
                        return <option key={courier.id} value={courier.id}>
                            {`${courier.name} ${courier.surname}`}
                        </option>
                        })}
                </select>
            </form>
        </div>
    )
}

export default CourierMenuSelect;