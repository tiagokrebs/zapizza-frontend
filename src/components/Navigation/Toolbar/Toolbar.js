import React from 'react';

import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Button } from 'react-bootstrap';
import classes from './Toolbar.module.css';
import NewOrderButton from '../OrderSideDrawer/NewOrderButton/NewOrderButton';

// todo: trocar <nav> por React-Bootstrap <NavBar/>

const toolbar = (props) => {
    let navButtons = (
        <form className="form-inline my-2 my-lg-0 text-right justify-content-end pull-right">
            <Link to="/login">
                <Button className="my-sm-0" variant="success">Login</Button>
            </Link>
            <Link to="/registro">
                <Button className="ml-2 my-sm-0" variant="primary">Registro</Button>
            </Link>
        </form>
    );
    
    if (props.isAuthenticated) {
        navButtons = null;
    }

    let navItems = props.isAuthenticated ? <NavigationItems userName={props.userName}/> : null;

    let drawerToggle = props.isAuthenticated ? <DrawerToggle clicked={props.drawerToggleClicked}/> : null;

    let newOrder = props.isAuthenticated ? <NewOrderButton clicked={props.newOrderClicked}/> : null;

    return (
        <header className={props.isAuthenticated ? classes.AuthToolbar : classes.Toolbar}>
            <nav>
                <Logo />
                {drawerToggle}
                <div className="d-flex mr-auto"></div>
                {newOrder}
                {navButtons}
                {navItems}
            </nav>
        </header>
    );
};

export default toolbar;