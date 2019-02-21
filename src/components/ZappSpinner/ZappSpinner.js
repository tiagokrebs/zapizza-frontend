import React from 'react';

import logo from '../../assets/images/logo.png';
import classes from './ZappSpinner.module.css';
import Spinner from '../UI/Spinner/Spinner';

const zappSpinner = () => (
    <div className={classes.ZappSpinner}>
        <div className={classes.Loader}>
            <img className={classes.Image} src={logo} alt="Zapizza"></img>
            <Spinner />
        </div>
    </div>
);

export default zappSpinner;