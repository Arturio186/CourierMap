import React from 'react';

import classes from './MapAnnotation.module.scss';

const MapAnnotation = () => {
    return <p className={classes.annotation}>
        <img src="./images/Red.svg" /> - свободный&nbsp;
        <img src="./images/Green.svg" /> - доставляется&nbsp; 
        <img src="./images/Blue.svg" /> - выбранный 
    </p>
}

export default MapAnnotation;