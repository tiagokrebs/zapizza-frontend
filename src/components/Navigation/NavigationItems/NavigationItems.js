import React from 'react';

//import classes from './NavigationItems.module.css';
// import NavigationItem from './NavigationItem/NavigationItem';
import NavAlerts from './NavAlerts/NavAlerts';

const navigationItems = (props) => (
    <ul className="navbar-nav content-rigth">
        <NavAlerts />
        {/* <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Authenticate</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>} */}
    </ul>
);

export default navigationItems;