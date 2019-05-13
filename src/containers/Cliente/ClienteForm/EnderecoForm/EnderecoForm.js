import React from 'react';

import { Form, FormControl } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

const enderecoForm = (props) => {
  return (
      <div id={`Endereco${props.index}`}>
          <div style={{textAlign: 'center', display: 'flex'}}>
              <span>Endereço #{props.index+1}</span>
              <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={props.addEndereco}></i></span>
              <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={props.remEndereco} id={props.index}></i></span>
          </div>
          <Form.Group className="row">
              <div className="col-lg-3 col-md-3">
                  <Form.Label>CEP</Form.Label>
                  <MaskedInput
                      mask={masks.cep}
                      guide={false}
                      type="text"
                      name="cep"
                      id={props.index}
                      value={props.endereco.cep.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.cep.touched && props.endereco.cep.invalid}
                      render={(ref, props) => (
                          <Form.Control ref={ref} {...props} />
                      )}
                      />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.cep.error}
                  </FormControl.Feedback>
              </div>
              <div className="col-lg-9 col-md-9">
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control
                      type="text"
                      name="logradouro"
                      id={props.index}
                      value={props.endereco.logradouro.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.logradouro.touched && props.endereco.logradouro.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.logradouro.error}
                  </FormControl.Feedback>
              </div>
          </Form.Group>
          <Form.Group className="row">
              <div className="col-lg-3 col-md-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                      type="text"
                      name="numero"
                      id={props.index}
                      value={props.endereco.numero.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.numero.touched && props.endereco.numero.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.numero.error}
                  </FormControl.Feedback>
              </div>
              <div className="col-lg-5 col-md-5">
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control
                      type="text"
                      name="complemento"
                      id={props.index}
                      value={props.endereco.complemento.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.complemento.touched && props.endereco.complemento.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.complemento.error}
                  </FormControl.Feedback>
              </div>
              <div className="col-lg-4 col-md-4">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                      type="text"
                      name="bairro"
                      id={props.index}
                      value={props.endereco.bairro.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.bairro.touched && props.endereco.bairro.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.bairro.error}
                  </FormControl.Feedback>
              </div>
          </Form.Group>
          <Form.Group className="row">
              <div className="col-lg-10 col-md-10">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control
                      type="text"
                      name="cidade"
                      id={props.index}
                      value={props.endereco.cidade.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.cidade.touched && props.endereco.cidade.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.cidade.error}
                  </FormControl.Feedback>
              </div>
              <div className="col-lg-2 col-md-2">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                      type="text"
                      name="estado"
                      id={props.index}
                      value={props.endereco.estado.value}
                      onChange={props.inputChangeHandler}
                      onBlur={props.inputBlurHandler}
                      isInvalid={props.endereco.estado.touched && props.endereco.estado.invalid}
                  />
                  <FormControl.Feedback type="invalid">
                      {props.endereco.estado.error}
                  </FormControl.Feedback>
              </div>
          </Form.Group>
      </div>
  )
}

export default enderecoForm;
