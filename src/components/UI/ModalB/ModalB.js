import React from 'react';

import { Modal } from 'react-bootstrap';

// todo: header e footer via props

const modalB = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop='static' size='lg'>
            <Modal.Header closeButton>
                <Modal.Title style={{color: '#594336'}}>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    {props.buttonClose}
                </Button>
                <Button variant="success" onClick={props.handleOk}>
                    {props.buttonOk}
                </Button>
            </Modal.Footer> */}
        </Modal>  
    );
};

export default modalB;