import React from 'react';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const rowActions = (props) => {
    let enable = 'enable'
    let icon = 'ban'
    let tip = 'Desativar'
    if (!props.row.ativo){
        enable = 'disable'
        icon = 'check'
        tip = 'Ativar'
    }
    return (
        <div>
            <OverlayTrigger key='top-edit' placement='top' overlay={
                <Tooltip id='tooltip-top-edit'>Editar</Tooltip>
                }>
                <i className='fas fa-edit' style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => props.modalFormUpdate(props.row)}></i>
            </OverlayTrigger>
            <OverlayTrigger key={`top-${enable}`} placement='top' overlay={
                <Tooltip id={`tooltip-top-${enable}`}>{tip}</Tooltip>
                }>
                <i className={`fas fa-${icon}`} style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => props.submitEnableHandler(props.row)}></i>
            </OverlayTrigger>
            <OverlayTrigger key='top-delete' placement='top' overlay={
                <Tooltip id='tooltip-top-delete'>Excluir</Tooltip>
                }>
                <i className='fas fa-trash-alt' style={{color: '#d4c3ba', margin: '0.5em'}} onClick={() => props.modalFormDelete(props.row)}></i>
            </OverlayTrigger>
        </div>
    );
};

export default rowActions;