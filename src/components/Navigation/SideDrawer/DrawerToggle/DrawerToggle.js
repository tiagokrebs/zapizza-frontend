import React from 'react';

import classes from './DrawerToggle.module.css';
import { Button } from 'react-bootstrap';

const drawerToggle = (props) => (
    <Button bsPrefix={`btn btn-link mr-sm-2 pull-right ${classes.DrawerToggle}`} onClick={props.clicked}>
        <span className={`fas fa-bars ${classes.Bars}`}></span>
    </Button>
);

export default drawerToggle;