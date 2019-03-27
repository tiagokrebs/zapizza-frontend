import React from 'react';

import { Form, FormControl } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

const enderecoForm = (props) => {
    return (
        props.enderecos.map((valor, index) => {
            return (
                <div key={index}>
                    <div style={{textAlign: 'center', display: 'flex'}}>
                        <span>Endereço #{[index+1]}</span>
                        <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={props.addEndereco}></i></span>
                        <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={props.remEndereco} id={[index]}></i></span>
                    </div>
                    <Form.Group className="row">
                        <div className="col-lg-3 col-md-3">
                            <Form.Label>CEP</Form.Label>
                            <MaskedInput
                                mask={masks.cep}
                                guide={false}
                                type="text"
                                name="cep"
                                id={[index]}
                                value={props.enderecos[index].cep.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].cep.touched && props.enderecos[index].cep.invalid}
                                render={(ref, props) => (
                                    <Form.Control ref={ref} {...props} />
                                )}
                                />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].cep.error}
                            </FormControl.Feedback>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control 
                                type="text"
                                name="logradouro"
                                id={[index]}
                                value={props.enderecos[index].logradouro.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].logradouro.touched && props.enderecos[index].logradouro.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].logradouro.error}
                            </FormControl.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                        <div className="col-lg-3 col-md-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control 
                                type="text"
                                name="numero"
                                id={[index]}
                                value={props.enderecos[index].numero.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].numero.touched && props.enderecos[index].numero.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].numero.error}
                            </FormControl.Feedback>
                        </div>
                        <div className="col-lg-5 col-md-5">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control 
                                type="text"
                                name="complemento"
                                id={[index]}
                                value={props.enderecos[index].complemento.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].complemento.touched && props.enderecos[index].complemento.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].complemento.error}
                            </FormControl.Feedback>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control 
                                type="text"
                                name="bairro"
                                id={[index]}
                                value={props.enderecos[index].bairro.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].bairro.touched && props.enderecos[index].bairro.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].bairro.error}
                            </FormControl.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                        <div className="col-lg-10 col-md-10">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control 
                                type="text"
                                name="cidade"
                                id={[index]}
                                value={props.enderecos[index].cidade.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].cidade.touched && props.enderecos[index].cidade.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].cidade.error}
                            </FormControl.Feedback>
                        </div>
                        <div className="col-lg-2 col-md-2">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control 
                                type="text"
                                name="estado"
                                id={[index]}
                                value={props.enderecos[index].estado.value}
                                onChange={props.inputChangeHandler}
                                onBlur={props.inputBlurHandler}
                                isInvalid={props.enderecos[index].estado.touched && props.enderecos[index].estado.invalid}
                            />
                            <FormControl.Feedback type="invalid">
                                {props.enderecos[index].estado.error}
                            </FormControl.Feedback>
                        </div>
                    </Form.Group>
                </div>
            )
        })
    )
}

export default enderecoForm;