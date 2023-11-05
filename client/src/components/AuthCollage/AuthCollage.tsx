import React from 'react';

import classes from './AuthCollage.module.scss';

import image1 from '../../images/image1.png';
import image2 from '../../images/image2.png';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';
import image6 from '../../images/image6.png';
import image7 from '../../images/image7.png';
import image8 from '../../images/image8.png';
import image9 from '../../images/image9.png';
import image10 from '../../images/image10.png';
import image12 from '../../images/image12.png';


const AuthCollage : React.FC = () => {
    return (
        <div className={classes.collage}>
            <div className={classes.first}>
                <img src={image7}/>
                <img src={image8}/>
                <img src={image5}/>
            </div>
            <div className={classes.second}>
                <img src={image3}/>
                <img src={image12}/>
                <img src={image10}/>
                <img src={image1}/>
            </div>
            <div className={classes.third}>
                <img src={image2}/>
                <img src={image6}/>
                <img src={image9}/>
                <img src={image4}/>
            </div>
        </div>
    )
}

export default AuthCollage;