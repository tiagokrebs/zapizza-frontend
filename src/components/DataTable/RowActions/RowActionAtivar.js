import React from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const rowActionAtivar = (props) => {
    let enable = 'enable'
    let icon = 'ban'
    let tip = 'Desativar'
    if (!props.row.ativo) {
        enable = 'disable'
        icon = 'check'
        tip = 'Ativar'
    }
    return (
        <OverlayTrigger key={`top-${enable}`} placement='top' overlay={
            <Tooltip id={`tooltip-top-${enable}`}>{tip}</Tooltip>
        }>
            <i className={`fas fa-${icon}`} style={{ color: '#d4c3ba', margin: '0.5em' }} onClick={() => props.submitEnableHandler(props.row)}></i>
        </OverlayTrigger>
    );
};

export default rowActionAtivar;