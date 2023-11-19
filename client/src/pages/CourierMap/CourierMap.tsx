import React, {useEffect, useRef, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Button, Placemark } from '@pbe/react-yandex-maps';

import Modal from '../../components/UI/Modal/Modal';

import './CourierMap.scss';
import { Context } from '../..';

interface ICourier {
    id: number; 
    name: string;
    surname: string;
    x: number;
    y: number;
}

interface IOrder {
    num: number;
    products: Array<string>;
    address: string;
    courier_id: number | null;
    x: number;
    y: number;
}

const CourierMap : React.FC = observer(() => {
    const [couriers, setCouriers] = useState<Array<ICourier>>([
        {id: 1, name: 'Артур', surname: 'Артурикович', x: 57.1493, y: 65.5412},
        {id: 2, name: 'Ренат', surname: 'Ренатикович', x: 57.1495, y: 65.5410},
        {id: 3, name: 'Матвей', surname: 'Мотикович', x: 57.1497, y: 65.5408}
    ]);

    const [orders, setOrders] = useState<Array<IOrder>>([
        {num: 1, products: ['Яблоко', 'Банан', 'Грушка'], address: 'г.Тюмень, ул. Ленина, д.25', courier_id: 1, x: 57.1453, y: 65.5552},
        {num: 2, products: ['Яблоко', 'Грушка', 'Грушка'], address: 'г.Тюмень, ул. Киевская, д.1', courier_id: 1, x: 57.1443, y: 65.5342},
        {num: 3, products: ['Грушка', 'Банан', 'Грушка'], address: 'г.Тюмень, ул. Харьковская, д.20', courier_id: 2, x: 57.1463, y: 65.5562},
        {num: 4, products: ['Яблоко', 'Банан', 'Яблоко'], address: 'г.Тюмень, ул. Вьюжная, д.21', courier_id: null, x: 57.1473, y: 65.5532},
        {num: 5, products: ['Банан', 'Банан', 'Банан'], address: 'г.Тюмень, ул. Володарского, д.22', courier_id: 3, x: 57.1453, y: 65.5352},
        {num: 6, products: ['Яблоко', 'Яблоко', 'Яблоко'], address: 'г.Тюмень, ул. Республики, д.24', courier_id: 3, x: 57.1453, y: 65.5572}
    ])

    const [targetCourier, setTargetCourier] = useState<ICourier>(couriers[0]);
    const [targetOrder, setTargetOrder] = useState<IOrder>({} as IOrder);

    const [modalCourier, setModalCourier] = useState<boolean>(false);
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
        couriers.forEach((courier) => {
            if (courier.id === Number(id)) {
                setTargetCourier(courier);
                setFocusOnCoord(courier.x, courier.y);
            }
        })
    }

    const openCourierModal = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        setModalCourier(true)
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
    /* ДОПИЛИТЬ, УЗНАТЬ КАК ОТЛОВИТЬ ПЛЕЙСМАРК, НА КОТОРЫЙ НАЖАЛИ  */
    const proccesMapClick = (event: React.MouseEvent<HTMLElement>, id : number) => {
        orders.forEach((order) => {
            if (order.num === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.x, order.y);
                openOrderModal(event, order.num)
            }
        })
    }
    
    // Позже убрать, вынести в шаблон/навбар
    const {user} = useContext(Context);

    const logout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
    }

    return (
        <div className="inner-content">
            <Modal visible={modalCourier} setVisible={setModalCourier}>
                <p><b>Курьер:</b> {`${targetCourier.name} ${targetCourier.surname}`}</p>
                <h3>Активные заказы</h3>
                {orders.map((order) => {
                    if (order.courier_id === targetCourier.id) {
                        return <p>Номер: {order.num}, Товары: {order.products}, Адрес: {order.address}</p>
                    }
                })}
            </Modal>
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <p> Номер заказа: {targetOrder.num}</p>
                <p> Cодержимое: {targetOrder.products?.map((product) => {
                    return <p>{product}</p>
                })}</p>
                <p> Адрес: {targetOrder.address}</p>
            </Modal>
            <button onClick={logout}>
                Выйти из аккаунта
            </button>
            <div className="window">
                <div className="menu">
                    <h3>Курьеры</h3>
                    <form className="couriers-menu">
                        <select name="courier" id="courier" onChange={(e) => setFocusOnCourier(e.target.value)}>
                            <option style={{display: 'none'}} selected={true} disabled={true}>Выбрать курьера</option>
                            {couriers.map((courier) => { 
                                return <option key={courier.id} value={courier.id}>
                                    {`${courier.name} ${courier.surname}`}
                                </option>
                                })}
                        </select>
                        <button onClick={openCourierModal}>Подробнее</button>
                    </form>
                    
                    <h3>Заказы</h3>
                    <div className="orders">
                        {orders.map((order) => {
                            return <div 
                                    className="order" 
                                    key={order.num} 
                                    onClick={(e) => openOrderModal(e, order.num)}
                                >
                                <div className="card">
                                    <p>Заказ №{order.num}</p>
                                    <div className="columns">
                                        <div className="left-column">
                                            <h3>Содержимое заказа</h3>
                                            {order.products.map((product) => {
                                                return <p>{product}</p>
                                            })}
                                        </div>
                                        <div className="right-column">
                                            <h3>Адрес доставки</h3>
                                            <p>Адрес: {order.address}</p>
                                        </div> 
                                    </div>
                                    <p className="status">Статус: {order.courier_id == null ? 'Свободный' : 'Доставляется'}</p>
                                </div>
                            </div>
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
                                data={{ content: "click" }}
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
                                            hintContent: 'Курьерчик',
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
                                            hintContent: 'Заказик',
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