import React from 'react';

import classes from './NavigationItems.module.css';
import NavAlerts from './NavAlerts/NavAlerts';
import NavLinks from './NavLinks/NavLinks';
import NavUser from './NavUser/NavUser';

const navigationItems = (props) => (
    <ul className={`navbar-nav content-rigth ${classes.NavigationItems}`}>
        <NavAlerts />
        <NavLinks />
        <NavUser userName={props.userName} />
    </ul>
);

export default navigationItems;