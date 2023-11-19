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

const CourierMap : React.FC = observer(() => {
    const [couriers, setCouriers] = useState<Array<ICourier>>([
        {id: 1, name: 'Артур', surname: 'Артурикович', x: 57.1493, y: 65.5412},
        {id: 2, name: 'Ренат', surname: 'Ренатикович', x: 57.1495, y: 65.5410},
        {id: 3, name: 'Матвей', surname: 'Мотикович', x: 57.1497, y: 65.5408}
    ]);

    const [targetCourier, setTargetCourier] = useState<ICourier>(couriers[0]);
    const [modalCourier, setModalCourier] = useState<boolean>(false);

    const mapRef = useRef<any>(null);

    useEffect(()=>{
        const intervalHandle = setInterval(() => {
            setCouriers([...couriers.map((courier) => {
                if (courier.id == 1) {
                    courier.x += 0.0001
                    courier.y += 0.0001
                }
                if (courier.id == 2) {
                    courier.x += 0.0002
                    courier.y += 0.0002
                }
                if (courier.id == 3) {
                    courier.x += 0.0003
                    courier.y += 0.0003
                }

                return courier; 
            })])
        }, 2000)

        return () => clearInterval(intervalHandle);
    }, [couriers])

    const setFocusOnCourier = (id : string) => {
        const focusCoord = {x: 0, y: 0};
        couriers.forEach((courier) => {
            if (courier.id === Number(id)) {
                setTargetCourier(courier);

                focusCoord.x = courier.x;
                focusCoord.y = courier.y;
            }
        })

        if (mapRef.current.setCenter) {
            mapRef.current.setCenter([focusCoord.x, focusCoord.y], mapRef.current.getZoom(), {
                duration: 300
            })
        }
    }

    const openCourierModal = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        setModalCourier(true)
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
                Выбран {`${targetCourier.name} ${targetCourier.surname}`}
            </Modal>
            <button onClick={logout}>
                Выйти из аккаунта
            </button>
            <div className="window">
                <div className="menu">
                    <h3>Курьеры</h3>
                    <form>
                        <select name="courier" id="courier" onChange={(e) => setFocusOnCourier(e.target.value)}>
                            {couriers.map((courier) => { 
                                return <option value={courier.id}>{`${courier.name} ${courier.surname}`}</option>
                                })}
                        </select>
                        <button onClick={openCourierModal}>Подробнее</button>
                    </form>
                    
                    <h3>Заказы</h3>
                    
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
                                        courier_id={courier.id}
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