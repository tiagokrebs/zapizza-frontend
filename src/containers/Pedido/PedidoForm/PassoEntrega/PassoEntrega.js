import React, { Component } from 'react';

import classes from './PassoEntrega.module.css';
import { Form, FormControl, FormCheck } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import * as masks from '../../../../shared/inputMasks';

class PassoEntrega extends Component {
  tipoEntregaRef = React.createRef();

  componentDidMount = () => {
    this.props.onUpdateSize();
    this.tipoEntregaRef.current.focus();
  }

  onTipoKeyDown = (e) => {
    if (["E","e","B","b"].includes(e.key)) {
        const event = {
            target: {
                name: 'tipoEntrega',
                value: e.key.toUpperCase(),
            }
        };
        this.props.inputChangeHandler(event);
    }
  }

  onTipoBlur = (e) => {
      const event = {
          target: {
              name: 'tipoEntrega'
          }
      };
      this.props.inputBlurHandler(event);
  }

  inputKeyDownHandler = (e) => {
      /**
       * Tab no último componente faz tentativa de ativar o próximo passo
       * para isso função de validação dos dados atuais é chamada
       */
      if (e.keyCode === 9) {
          e.preventDefault();
          this.props.handleComplete();
      }
  }

  render () {
    const enderecos = this.props.selectedClienteData.enderecos.map((endereco, index) => {
      return (
        <FormCheck
          key={index}
          custom
          type="radio"
          label={`Endereço #${index}`}
          name="enderecoEntrega"
          id={`enderecoEntrega${index}`}
        >
          <span>
            <FormCheck.Input
              type="radio"
              name="enderecoEntrega"
              id={`enderecoEntrega${index}`}
              checked={this.props.enderecoEntrega.value === endereco.hash_id}
              onChange={this.props.inputChangeHandler}
              value={endereco.hash_id}
              tabIndex="-1"
            />
            <FormCheck.Label>
              <div style={{textAlign: 'center', display: 'flex'}}>
                  <span>Endereço #{index+1}</span>
              </div>
            </FormCheck.Label>
            <span><i className="fas fa-plus-circle" style={{marginLeft: '10px'}} onClick={() => console.log('Click novo endereço')}></i></span>
            <span><i className="fas fa-trash-alt" style={{marginLeft: '10px'}} onClick={() => console.log('Click remove endereço')} id={index}></i></span>
            {
              this.props.enderecoEntrega.value !== "outro" ?
              <div className={`card ${classes.Card}`}>
                  <div className={`card-block ${classes.CardBlock}`}>
                      <div style={{color: '#316293', textAlign: 'center'}}>
                        <small>
                          {
                            endereco.logradouro +
                              (endereco.numero ? ', ' + endereco.numero : '') +
                              (endereco.complemento ? ', ' + endereco.complemento : '') +
                              (endereco.bairro ? ', ' + endereco.bairro : '') +
                              (endereco.cidade ? ', ' + endereco.cidade : '')
                            }
                        </small>
                      </div>
                  </div>
              </div> 
              : null
            }
          </span>
        </FormCheck>
      )
    });

    return (
      <div className={`col-sm-12 ${classes.PassoEntrega}`}>
          <Form.Group className="row">
              <div
                tabIndex="0"
                className="col-lg-12 col-md-12"
                ref={this.tipoEntregaRef}
                onKeyDown={this.onTipoKeyDown}
                onBlur={this.props.inputBlurHandler}
                name="tipoEntrega"
                >
                <Form.Check
                  inline
                  custom
                  type="radio"
                  label="Entrega"
                  name="tipoEntrega"
                  id="tipoEntrega1"
                  checked={this.props.tipoEntrega.value === "E"}
                  onChange={this.props.inputChangeHandler}
                  value="E"
                  tabIndex="-1"
                />
                <Form.Check
                  inline
                  custom
                  type="radio"
                  label="Busca"
                  name="tipoEntrega"
                  id="tipoEntrega2"
                  checked={this.props.tipoEntrega.value === "B"}
                  onChange={this.props.inputChangeHandler}
                  value="B"
                  tabIndex="-1"
                />
                {
                    this.props.tipoEntrega.touched && this.props.tipoEntrega.invalid && (
                        <div style={{display: 'block', marginTop: '.25rem', fontSize: '80%', color: '#dc3545'}}>
                            {this.props.tipoEntrega.error}
                        </div>
                    )
                }
              </div>
          </Form.Group>
          {/* lista de endereços quando entrega tipo E */}
          {
            this.props.tipoEntrega.value === "E" ? (
              <Form.Group className="row">
                <div
                  className="col-lg-12 col-md-12"
                  onBlur={this.props.inputBlurHandler}
                  name="enderecoEntrega"
                >
                  {enderecos}
                  {
                    this.props.enderecoEntrega.touched && this.props.enderecoEntrega.invalid && (
                        <div style={{display: 'block', marginTop: '.25rem', fontSize: '80%', color: '#dc3545'}}>
                            {this.props.enderecoEntrega.error}
                        </div>
                    )
                  }
                </div>
              </Form.Group>
            ) : null
          }
          <Form.Group className="row">
            <div className="col-lg-12 col-md-12">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="obsEntrega"
                value={this.props.obsEntrega.value}
                placeholder="Informações sobre a entrega"
                onChange={this.props.inputChangeHandler}
                onBlur={this.props.inputBlurHandler}
                isInvalid={this.props.obsEntrega.touched && this.props.obsEntrega.invalid}
              />
              <FormControl.Feedback type="invalid">
                  {this.props.obsEntrega.error}
              </FormControl.Feedback>
            </div>
          </Form.Group>
          <Form.Group className="row">
            <div className="col-lg-12 col-md-12">
                <Form.Label>Valor</Form.Label>
                    <MaskedInput
                        mask={masks.valorP6S2}
                        guide={false}
                        type="text"
                        name="valorEntrega"
                        value={this.props.valorEntrega.value}
                        placeholder="Informe o valor da entrega"
                        onChange={this.props.inputChangeHandler}
                        onBlur={this.props.inputBlurHandler}
                        onKeyDown={this.inputKeyDownHandler}
                        isInvalid={this.props.valorEntrega.touched && this.props.valorEntrega.invalid}
                        render={(ref, props) => (
                            <Form.Control ref={ref} {...props} />
                        )}
                        />
                    <FormControl.Feedback type="invalid">
                        {this.props.valorEntrega.error}
                    </FormControl.Feedback>
            </div>
          </Form.Group>
          <hr/>
          {this.props.stepDefultButtons}
      </div>
    );
  }
}

export default PassoEntrega;
