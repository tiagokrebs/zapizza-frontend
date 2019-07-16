import React from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const rowActionExcluir = (props) => {
    return (
        <OverlayTrigger key='top-delete' placement='top' overlay={
            <Tooltip id='tooltip-top-delete'>Excluir</Tooltip>
        }>
            <i className='fas fa-trash-alt' style={{ color: '#d4c3ba', margin: '0.5em' }} onClick={() => props.modalFormDelete(props.row)}></i>
        </OverlayTrigger>
    );
};

export default rowActionExcluir;