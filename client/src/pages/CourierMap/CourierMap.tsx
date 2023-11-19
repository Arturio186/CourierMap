import React, {useEffect, useRef, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Button, Placemark } from '@pbe/react-yandex-maps';

import './CourierMap.scss';
import { Context } from '../..';

interface IMarkerCoords {
    x: number;
    y: number;
}

const CourierMap : React.FC = observer(() => {
    const mapRef = useRef<any>(null);

    const [markerCoords, setMarkerCoords] = useState<IMarkerCoords>({x: 57.1493, y: 65.5412 });

    useEffect(()=>{
        const intervalHandle = setInterval(() => {
            setMarkerCoords({x: markerCoords.x + 0.0003, y: markerCoords.y + 0.0003})
            mapRef.current.setCenter([markerCoords.x, markerCoords.y], mapRef.current.getZoom(), {
                duration: 300
            })
        }, 2000)

        return () => clearInterval(intervalHandle);
    }, [markerCoords])

    // Позже убрать, вынести в шаблон/навбар
    const {user} = useContext(Context);

    const logout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
    }

    return (
        <div className="inner-content">
            <button onClick={logout}>
                Выйти из аккаунта
            </button>
            <h1>Отслеживание курьеров</h1>
            <div className="">

            </div>
            <div className="map">
                <YMaps query={{
                    apikey: '0b375996-25a4-4d5d-9152-504fa8810cd2',
                }}>
                    <Map 
                        width="64%"
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
                        <Placemark
                            geometry={{
                                type: 'Point',
                                coordinates: [markerCoords.x, markerCoords.y]
                            }}
                            options={{
                                preset: 'islands#circleIcon',
                                iconColor: 'blue',
                            }} 
                            properties={{
                                hintContent: 'Вечеринка',
                                balloonContent: 'Курьерчик'
                            }}
                        />
                    </Map>
                </YMaps>
            </div>
        </div>
    )
})

export default CourierMap;