import React from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const rowActionEditar = (props) => {
    return (
        <OverlayTrigger key='top-edit' placement='top' overlay={
            <Tooltip id='tooltip-top-edit'>Editar</Tooltip>
        }>
            <i className='fas fa-edit' style={{ color: '#d4c3ba', margin: '0.5em' }} onClick={() => props.modalFormUpdate(props.row)}></i>
        </OverlayTrigger>
    );
};

export default rowActionEditar;