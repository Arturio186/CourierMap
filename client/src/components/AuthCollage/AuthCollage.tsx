import React from 'react';

import classes from './AuthCollage.module.scss';

const AuthCollage : React.FC = () => {
    return (
        <div className={classes.collage}>
            <div className={classes.first}>
                <img src='./images/image7.png'/>
                <img src='./images/image8.png'/>
                <img src='./images/image5.png'/>
            </div>
            <div className={classes.second}>
                <img src='./images/image3.png'/>
                <img src='./images/image12.png'/>
                <img src='./images/image10.png'/>
                <img src='./images/image1.png'/>
            </div>
            <div className={classes.third}>
                <img src='./images/image2.png'/>
                <img src='./images/image6.png'/>
                <img src='./images/image9.png'/>
                <img src='./images/image4.png'/>
            </div>
        </div>
    )
}

export default AuthCollage;