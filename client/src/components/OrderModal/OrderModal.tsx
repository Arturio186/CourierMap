import React from 'react';

import classes from './OrderModal.module.scss';

import IOrderModalProps from 'interfaces/props/IOrderModalProps';

import Button from 'components/UI/Button/Button';

const OrderModal : React.FC<IOrderModalProps> = ({ order }) => {

    return <div className={classes.card}>
        <h2 className={classes.title}>Заказ: №{order.id}</h2>
        <p className={classes.products}>Cодержимое:</p>
        <ul>    
            {order.products?.map((product) => {
                return <li>{product.name}. Количество: {product.quantity}</li>
            })}
        </ul>
        <p className={classes.address}> Адрес: {order.address}</p>
        <h3 className={classes.client}>Клиент: {order.client_name}</h3>
        <p>{order.client_phone}</p>
        <p className={classes.price}>Итого: {Math.floor(order.total_price)} руб.</p>
        <div className={classes.controls}>
            <Button>Изменить</Button>
            <Button>Удалить</Button>
        </div>
    </div>
}

export default OrderModal;