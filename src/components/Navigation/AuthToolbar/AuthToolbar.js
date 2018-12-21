import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './AuthToolbar.module.css';

const authToolbar = (props) => {
    let navItems = (
        <form className="form-inline my-2 my-lg-0 text-right justify-content-end pull-right">
            <Link to="/logout">
                <Button className="ml-2 my-sm-0" variant="primary">Logout</Button>
            </Link>
        </form>
    );

    return (
        <header className={classes.AuthToolbar}>
        <nav>
           <Logo />
           <div className="d-flex mr-auto"></div>
           <NavigationItems />        
        </nav>
    </header>
    );
};

export default authToolbar;