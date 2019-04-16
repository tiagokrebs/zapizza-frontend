import React from 'react';

// import classes from './NewOrderButton.module.css';
import { Button } from 'react-bootstrap';

const newOrderButton = (props) => (
    <Button variant="primary" size="sm" onClick={props.clicked}>
        <i className="fa fa-plus"></i> 
        <span> Novo Pedido</span>
    </Button>
);

export default newOrderButton;