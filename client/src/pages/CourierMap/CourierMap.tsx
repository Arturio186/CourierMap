import React, {useEffect, useRef, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Button, Placemark } from '@pbe/react-yandex-maps';

import './CourierMap.scss';

import ICourier from 'interfaces/ICourier';
import IOrder from 'interfaces/IOrder';

import Modal from 'components/UI/Modal/Modal';

const CourierMap : React.FC = observer(() => {
    const [couriers, setCouriers] = useState<Array<ICourier>>([
        {id: 1, name: 'Артур', surname: 'Артурикович', x: 57.1493, y: 65.5412},
        {id: 2, name: 'Ренат', surname: 'Ренатикович', x: 57.1495, y: 65.5410},
        {id: 3, name: 'Матвей', surname: 'Мотикович', x: 57.1497, y: 65.5408}
    ]);

    const [orders, setOrders] = useState<Array<IOrder>>([
        {price: 5320, num: 1, products: ['Яблоко', 'Банан', 'Грушка'], address: 'г.Тюмень, ул. Ленина, д.25', courier_id: 1, x: 57.1453, y: 65.5552},
        {price: 5320, num: 2, products: ['Яблоко', 'Грушка', 'Грушка'], address: 'г.Тюмень, ул. Киевская, д.1', courier_id: 1, x: 57.1443, y: 65.5342},
        {price: 5320, num: 3, products: ['Грушка', 'Банан', 'Грушка'], address: 'г.Тюмень, ул. Харьковская, д.20', courier_id: 2, x: 57.1463, y: 65.5562},
        {price: 5320, num: 4, products: ['Яблоко', 'Банан', 'Яблоко'], address: 'г.Тюмень, ул. Вьюжная, д.21', courier_id: null, x: 57.1473, y: 65.5532},
        {price: 5320, num: 5, products: ['Банан', 'Банан', 'Банан'], address: 'г.Тюмень, ул. Володарского, д.22', courier_id: 3, x: 57.1453, y: 65.5352},
        {price: 5320, num: 6, products: ['Яблоко', 'Яблоко', 'Яблоко'], address: 'г.Тюмень, ул. Республики, д.24', courier_id: 3, x: 57.1453, y: 65.5572}
    ])

    const [targetCourier, setTargetCourier] = useState<ICourier | null>(null);
    const [targetOrder, setTargetOrder] = useState<IOrder>({} as IOrder);

    const [modalOrder, setModalOrder] = useState<boolean>(false);

    const mapRef = useRef<any>(null);

    useEffect(()=>{
        const intervalHandle = setInterval(() => {
            setCouriers([...couriers.map((courier) => {
                if (courier.id === 1) {
                    courier.x += 0.0001
                    courier.y += 0.0001
                }
                if (courier.id === 2) {
                    courier.x += 0.0002
                    courier.y += 0.0002
                }
                if (courier.id === 3) {
                    courier.x += 0.0003
                    courier.y += 0.0003
                }

                return courier; 
            })])
        }, 2000)

        return () => clearInterval(intervalHandle);
    }, [couriers])

    const setFocusOnCoord = (x : number, y : number) => {
        if (mapRef.current.setCenter) {
            mapRef.current.setCenter([x, y], mapRef.current.getZoom(), {
                duration: 300
            })
        }
    }

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

    const openOrderModal = (event: React.MouseEvent<HTMLElement>, id : number) => {
        event.preventDefault();

        orders.forEach((order) => {
            if (order.num === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.x, order.y);
            }
        })

        setModalOrder(true);
    } 
    
    const proccesMapClick = (event: React.MouseEvent<HTMLElement>, id : number) => {
        orders.forEach((order) => {
            if (order.num === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.x, order.y);
                openOrderModal(event, order.num)
            }
        })
    }

    return (
        <div className="inner-content">
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <p> Номер заказа: {targetOrder.num}</p>
                <p> Cодержимое: {targetOrder.products?.map((product) => {
                    return <p>{product}</p>
                })}</p>
                <p> Адрес: {targetOrder.address}</p>
            </Modal>
            <div className="window">
                <div className="menu">
                    <div className="menu__row">
                        <div>
                            <h3>Заказы</h3>
                            {targetCourier && <p>Курьер: {targetCourier.name} {targetCourier.surname}</p>}
                        </div>
                        
                        <form className="couriers-menu">
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
                    <div className="orders">
                        {orders.map((order) => {
                            if (targetCourier === null || targetCourier.id === order.courier_id) {
                                return <div 
                                    className="order" 
                                    key={order.num} 
                                    onClick={(e) => openOrderModal(e, order.num)}
                                >
                                <div className="card">
                                    <p className="num">Заказ №{order.num}</p>
                                    <div className="columns">
                                        <div className="left-column">
                                            <p>Клиент: Артём</p>
                                            <p>+79124199313</p>
                                            <p>Стоимость: <b>{order.price}</b> руб.</p>
                                        </div>
                                        <div className="right-column">
                                            <h3>Адрес доставки</h3>
                                            <p>Адрес: {order.address}</p>
                                        </div> 
                                    </div>
                                    <p className="status">Статус: <b>{order.courier_id == null ? 'Свободный' : 'Доставляется'}</b></p>
                                </div>
                            </div>
                            }
                        })}
                    </div>
                </div>
                <div className="map">
                    <YMaps query={{
                        apikey: '0b375996-25a4-4d5d-9152-504fa8810cd2',
                    }}>
                        <Map
                            width="100%"
                            height="80vh"
                            modules={ [ 'geoObject.addon.balloon', 'geoObject.addon.hint' ] }
                            defaultState={{center: [57.1493, 65.5412], zoom: 15}}
                            instanceRef={(map : any) => mapRef.current = map}
                            options={{suppressMapOpenBlock: true}}
                        >
                            <Button
                                options={{ maxWidth: 128, selectOnClick: false }}
                                data={{ content: "Создать заказ" }}
                                onClick={() => alert('click')}
                            />
                            {
                                couriers.map((courier) => {
                                    return <Placemark
                                        key={courier.id}
                                        geometry={{
                                            type: 'Point',
                                            coordinates: [courier.x, courier.y]
                                        }}
                                        options={{
                                            preset: 'islands#circleIcon',
                                            iconColor: 'blue',
                                        }} 
                                        properties={{
                                            hintContent: `${courier.name} ${courier.surname}`,
                                            balloonContent: `${courier.name} ${courier.surname}`
                                        }}
                                    />
                                })
                            }
                            {
                                orders.map((order) => {
                                    return <Placemark
                                        key={order.num}
                                        geometry={{
                                            type: 'Point',
                                            coordinates: [order.x, order.y]
                                        }}
                                        options={{
                                            preset: 'islands#dotIcon',
                                            iconColor: order.num === targetOrder.num ? 'red' : 'green',
                                        }} 
                                        properties={{
                                            hintContent: `Заказ ${order.num}`,
                                        }}
                                        onClick={
                                            (event : React.MouseEvent<HTMLElement>) => proccesMapClick(event, order.num)
                                        }
                                    />
                                })
                            }
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div>
    )
})

export default CourierMap;