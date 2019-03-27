import React from 'react';

import { Form, FormControl } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

const telefoneForm = (props) => {
    return (
        props.telefones.map((valor, index) => {
            const label = (
                <div style={{textAlign: 'center', display: 'flex'}}>
                    <span>Telefone #{[index+1]}</span>
                    <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={props.addTelefone}></i></span>
                    <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={props.remTelefone} id={[index]}></i></span>
                </div>
            );
            return (
                <div key={index}>
                    <Form.Group className="row">
                        <div className="col-lg-8 col-md-8">
                            <Form.Label>{label}</Form.Label>
                            <MaskedInput
                                mask={masks.telefone}
                                guide={false}
                                type="text"
                                name="telefone"
                                id={[index]}
                                value={props.telefones[index].telefone.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.telefones[index].telefone.touched && props.telefones[index].telefone.invalid}
                                render={(ref, props) => (
                                    <Form.Control ref={ref} {...props}/>
                                )}
                                />
                            <FormControl.Feedback type="invalid">
                                {props.telefones[index].telefone.error}
                            </FormControl.Feedback>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                                as="select"
                                type="text"
                                name="tipo"
                                id={[index]}
                                value={props.telefones[index].tipo.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.telefones[index].tipo.touched && props.telefones[index].tipo.invalid}
                            >
                                <option></option>
                                <option>Celular</option>
                                <option>Casa</option>
                                <option>Trabalho</option>
                            </Form.Control>
                            <FormControl.Feedback type="invalid">
                                {props.telefones[index].tipo.error}
                            </FormControl.Feedback>
                        </div>
                    </Form.Group>
                </div>
            )
        })
    )
}

export default telefoneForm;