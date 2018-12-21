import React from 'react';

import { Link } from 'react-router-dom';
import zapizzaLogo from '../../assets/images/logo_header.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <Link to="/">
        <div className={`${classes.Logo} navbar-brand`}>
            <img src={zapizzaLogo} alt="Zapizza" />
        </div>
    </Link>
);

export default logo;