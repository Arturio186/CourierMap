import React from 'react';

import classes from './Orders.module.scss';

import IOrdersProps from 'interfaces/props/IOrdersProps';

const Orders : React.FC<IOrdersProps> = ({orders, targetCourier, openOrderModal}) => {
    return <div className={classes.orders}>
    {orders.map((order) => {
        if (targetCourier === null || targetCourier.id === order.courier_id) {
            return <div 
                className={classes.order}
                key={order.id} 
                onClick={() => openOrderModal(order.id)}
            >
            <div className={classes.card}>
                <p className={classes.num}>Заказ №{order.id}</p>
                <div className={classes.columns}>
                    <div className={classes.left}>
                        <p>Клиент: {order.client_name}</p>
                        <p>{order.client_phone}</p>
                        <p>Стоимость: <b>{order.total_price}</b> руб.</p>
                    </div>
                    <div className={classes.right}>
                        <h3>Адрес доставки</h3>
                        <p>Адрес: {order.address}</p>
                    </div> 
                </div>
                <p className={classes.status}>Статус: <b>{order.courier_id == null ? 'Свободный' : 'Доставляется'}</b></p>
            </div>
        </div>
        }
    })}
</div>

}

export default Orders;