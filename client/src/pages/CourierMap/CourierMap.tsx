import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Placemark, Button, Clusterer, SearchControl  } from '@pbe/react-yandex-maps';

import './CourierMap.scss';

import { GetOrders } from 'http/OrdersAPI';

import ICourier from 'interfaces/ICourier';
import IOrder from 'interfaces/IOrder';

import Modal from 'components/UI/Modal/Modal';

const CourierMap : React.FC = observer(() => {
    const [couriers, setCouriers] = useState<Array<ICourier>>([
        {id: 1, name: 'Артур', surname: 'Артурикович', x: 57.1493, y: 65.5412},
        {id: 2, name: 'Ренат', surname: 'Ренатикович', x: 57.1495, y: 65.5410},
        {id: 3, name: 'Матвей', surname: 'Мотикович', x: 57.1497, y: 65.5408}
    ]);

    const [orders, setOrders] = useState<Array<IOrder>>([])

    const [ordersLoading, setOrdersLoading] = useState<boolean>(true);

    useEffect(()=> {
        (async () => {
            const response = await GetOrders();

            if (response.status === 200) {
                setOrders(response.message.orders)
            }

            setOrdersLoading(false);
        })();
    }, []);


    const [targetCourier, setTargetCourier] = useState<ICourier | null>(null);
    const [targetOrder, setTargetOrder] = useState<IOrder>({} as IOrder);

    const [modalOrder, setModalOrder] = useState<boolean>(false);
    const [modalCreateOrder, setModalCreateOrder] = useState<boolean>(false);

    const creatorPlacemarkRef = useRef<any>(null);
    const [creatorPlacemark, setCreatorPlacemark] = useState<React.ReactNode>(null);

    const searchControlRef = useRef<any>(null);
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
        orders.forEach((order) => {
            if (order.id === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.map_x, order.map_y);
            }
        })

        setModalOrder(true);
    } 
    
    const proccesMapClick = (event: React.MouseEvent<HTMLElement>, id : number) => {
        orders.forEach((order) => {
            if (order.id === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.map_x, order.map_y);
                openOrderModal(event, order.id)
            }
        })
    }

    const handleResultShow = () => {
        const searchControlRefCurrent = searchControlRef.current;

        if (searchControlRefCurrent) {
            const results = searchControlRefCurrent.getResultsArray();
    
            searchControlRefCurrent.hideResult();
            
            if (results.length > 0) {
                const firstResult = results[0];
                const coordinates = firstResult.geometry.getCoordinates();

                addCreatorPlacemark(coordinates);
            }
        }
    };

    const addCreatorPlacemark = (coords: Array<number>) => {
        setCreatorPlacemark(<Placemark
            onClick={() => setModalCreateOrder(true)}
            instanceRef={(placemark : any) => creatorPlacemarkRef.current = placemark}
            geometry={{
                type: 'Point',
                coordinates: coords
            }}
            options={{
                preset: 'islands#dotIcon',
                iconColor: 'red',
                draggable: true
            }} 
            properties={{
                hintContent: 'Чтобы создать заказ, нажми на меня!'
            }}
        />)
    }

    return ( 
        <div className="inner-content">
            {creatorPlacemarkRef.current && <Modal visible={modalCreateOrder} setVisible={setModalCreateOrder}>
                Здесь форма создания заказа
                <p>{creatorPlacemarkRef.current.geometry._coordinates[0]}</p>
                <p>{creatorPlacemarkRef.current.geometry._coordinates[1]}</p>
            </Modal>}
            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <p> Номер заказа: {targetOrder.id}</p>
                <p> Cодержимое: {targetOrder.products?.map((product) => {
                    return <p>{product.name}</p>
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
                                    key={order.id} 
                                    onClick={(e) => openOrderModal(e, order.id)}
                                >
                                <div className="card">
                                    <p className="num">Заказ №{order.id}</p>
                                    <div className="columns">
                                        <div className="left-column">
                                            <p>Клиент: {order.client_name}</p>
                                            <p>{order.client_phone}</p>
                                            <p>Стоимость: <b>{order.total_price}</b> руб.</p>
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
                        suggest_apikey: 'fd6f5511-dbbe-4db1-bc61-b5f9a6b71f37'
                    }}>
                        <Map
                            width="100%"
                            height="80vh"
                            modules={ [ 'geoObject.addon.balloon', 'geoObject.addon.hint' ] }
                            defaultState={{center: [57.1493, 65.5412], zoom: 15, controls: []}}
                            instanceRef={(map : any) => mapRef.current = map}
                            options={{suppressMapOpenBlock: true}}
                        >
                            <Button
                                options={{ maxWidth: 128, selectOnClick: false }}
                                data={{ content: "Создать заказ" }}
                                onClick={() => addCreatorPlacemark(mapRef.current.getCenter())}
                            />
                            {
                                couriers.map((courier) => {
                                    if (targetCourier === null || targetCourier.id === courier.id) {
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
                                    }
                                })
                            }
                            <Clusterer
                                options={{
                                    preset: "islands#invertedBlueClusterIcons",
                                    groupByCoordinates: false,
                                }}
                            >
                            {
                                orders.map((order) => {
                                    if (targetCourier === null || targetCourier.id === order.courier_id) {
                                        return <Placemark
                                            key={order.id}
                                            geometry={{
                                                type: 'Point',
                                                coordinates: [order.map_x, order.map_y]
                                            }}
                                            options={{
                                                preset: 'islands#dotIcon',
                                                iconColor:  order.courier_id !== null ? order.id === targetOrder.id ? 'blue' : 'green' : 'red',
                                            }} 
                                            properties={{
                                                hintContent: `Заказ ${order.id}`,
                                            }}
                                            onClick={
                                                (event : React.MouseEvent<HTMLElement>) => proccesMapClick(event, order.id)
                                            }
                                        />
                                    }
                                })
                            }
                            </Clusterer>
                            <SearchControl 
                                options={{ float: "right" }} 
                                instanceRef={(searchControl : any) => searchControlRef.current = searchControl}
                                onResultShow={handleResultShow}
                            />
                            {creatorPlacemark}
                        </Map>
                    </YMaps>
                    <p className="annotation">
                        <img src="./images/Red.svg" /> - свободный&nbsp;
                        <img src="./images/Green.svg" /> - доставляется&nbsp; 
                        <img src="./images/Blue.svg" /> - выбранный 
                    </p>
                </div>
            </div>
        </div>
    )
})

export default CourierMap;