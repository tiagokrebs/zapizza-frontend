import React from 'react';

import Logo from '../../Logo/Logo';
import { Button } from 'react-bootstrap';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <nav>
           <Logo />
           <div className="d-flex mr-auto"></div>
           <form className="form-inline my-2 my-lg-0 text-right justify-content-end pull-right">
               <Button className="my-sm-0" variant="success" href="/login">Login</Button>
               <Button className="ml-2 my-sm-0" variant="primary" href="/registro">Registro</Button>
           </form>
        </nav>
    </header>
);

export default toolbar;