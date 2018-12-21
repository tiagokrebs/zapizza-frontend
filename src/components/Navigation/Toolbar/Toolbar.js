import React from 'react';

import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import { Button } from 'react-bootstrap';
import classes from './Toolbar.module.css';

const toolbar = (props) => {
    let navItems = (
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
        navItems = (
            <form className="form-inline my-2 my-lg-0 text-right justify-content-end pull-right">
                <Link to="/logout">
                    <Button className="ml-2 my-sm-0" variant="primary">Logout</Button>
                </Link>
            </form>
        );
    }   

    return (
        <header className={classes.Toolbar}>
        <nav>
           <Logo />
           <div className="d-flex mr-auto"></div>
            {navItems}        
        </nav>
    </header>
    );
};

export default toolbar;