import React, { Component } from 'react';

import { Alert, Form, Button } from 'react-bootstrap';

class DeleteForm extends Component {
    state = {
        buttonDisable: true,
        registerDesc: ''
    }

    inputChangeHandler = (event) => {
        this.setState({registerDesc: event.target.value});
        if (event.target.value === this.props.elementDesc){
            this.setState({buttonDisable: false});
        }
    }
    
    render () {
        return (
            <div style={{color: 'black'}}>
                <Alert variant="warning">
                    Coisas inesperadas vão acontecer se você não ler isto!
                </Alert>
                <p>
                    Essa ação não pode ser revertida. Ela vai deletar de forma
                    permanente o cadastro <strong>{this.props.elementDesc}</strong> e todas as suas associações.
                </p>
                <p>
                    Por favor digite o nome do registro para confirmar.

                </p>
                <Form noValidate onSubmit={this.props.deleteConfirm}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="descricao"
                            value={this.state.registerDesc}
                            onChange={this.inputChangeHandler}
                            autoFocus/>
                    </Form.Group>
                    <Button 
                        variant="danger" style={{width: '100%'}} 
                        disabled={this.state.buttonDisable}
                        type="submit"
                        >
                        <strong>
                            Eu entendo as consequências, deletar este registro.
                        </strong>
                    </Button>
                </Form>
            </div>
        );
    }
}

export default DeleteForm;