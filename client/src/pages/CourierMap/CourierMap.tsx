import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Placemark, Button, Clusterer, SearchControl  } from '@pbe/react-yandex-maps';

import './CourierMap.scss';

import { GetOrders } from 'http/OrdersAPI';

import ICourier from 'interfaces/ICourier';
import IOrder from 'interfaces/IOrder';

import Modal from 'components/UI/Modal/Modal';
import OrderModal from 'components/OrderModal/OrderModal';
import CourierMenuSelect from 'components/CourierMenuSelect/CourierMenuSelect';
import Orders from 'components/Orders/Orders';
import MapAnnotation from 'components/MapAnnotation/MapAnnotation';
import AddOrderForm from 'components/Forms/AddOrderForm/AddOrderForm';

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

    const openOrderModal = (id : number) => {
        orders.forEach((order) => {
            if (order.id === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.map_x, order.map_y);
            }
        })

        setModalOrder(true);
    } 
    
    const proccesMapClick = (id : number) => {
        orders.forEach((order) => {
            if (order.id === id) {
                setTargetOrder(order);
                setFocusOnCoord(order.map_x, order.map_y);
                openOrderModal(order.id)
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
                iconColor: 'black',
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
                <AddOrderForm
                    map_x={creatorPlacemarkRef.current.geometry._coordinates[0]}
                    map_y={creatorPlacemarkRef.current.geometry._coordinates[1]}
                    visible={modalCreateOrder}
                    couriers={couriers}
                />
            </Modal>}

            <Modal visible={modalOrder} setVisible={setModalOrder}>
                <OrderModal order={targetOrder} />
            </Modal>

            <div className="window">
                <div className="menu">
                    <CourierMenuSelect
                        targetCourier={targetCourier}
                        setTargetCourier={setTargetCourier}
                        setFocusOnCoord={setFocusOnCoord}
                        couriers={couriers}
                     />
                    <Orders 
                        orders={orders}
                        targetCourier={targetCourier}
                        openOrderModal={openOrderModal}
                    />
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
                                            onClick={() => proccesMapClick(order.id)}
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
                    <MapAnnotation />
                </div>
            </div>
        </div>
    )
})

export default CourierMap;