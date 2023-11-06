import React, {useRef} from 'react';
import { YMaps, Map, Button } from '@pbe/react-yandex-maps';

import './CourierMap.scss';

const CourierMap : React.FC = () => {
    const mapRef = useRef<any>(null);

    return (
        <div className="inner-content">
            <h1>Отслеживание курьеров</h1>
            <div className="map">
                <YMaps query={{
                    apikey: '0b375996-25a4-4d5d-9152-504fa8810cd2',
                }}>
                    <Map 
                        width="400px"
                        height="400px"
                        defaultState={{center: [57.1493, 65.5412], zoom: 15}}
                        instanceRef={(map : any) => mapRef.current = map}
                    >
                        <Button
                            options={{ maxWidth: 128, selectOnClick: false }}
                            data={{ content: "click" }}
                            onClick={() => console.log('click')}
                        />
                        
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}

export default CourierMap;