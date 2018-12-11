import React from 'react';

import zapizzaLogo from '../../assets/images/logo_header.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <a href="/" className={`${classes.Logo} navbar-brand`}>
        <img src={zapizzaLogo} alt="Zapizza" />
    </a>
);

export default logo;