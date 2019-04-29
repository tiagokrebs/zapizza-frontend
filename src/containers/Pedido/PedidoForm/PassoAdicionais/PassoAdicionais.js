import React, { Component } from 'react';

import classes from './PassoAdicionais.module.css';
import { Form } from 'react-bootstrap';
import Select from '../../../../components/UI/Select/Select';

class PassoAdicionais extends Component {
  adicionaisRef = React.createRef();

  componentDidMount = () => {
    this.adicionaisRef.current.focus();
  }

  adicionaisFocus = () => {
    this.adicionaisRef.current.focus();
  }

  getSelectAdicionais = () => {
      let adicionais = this.props.adicionais.map((adicional) => {
          if (adicional.ativo) {
              return {
                  label: adicional.descricao,
                  value: adicional.hash_id,
                  hash_id: adicional.hash_id
              }
          }
          return {
              label: adicional.descricao,
              value: adicional.hash_id,
              hash_id: adicional.hash_id,
              disable: true
          }
      });
      return adicionais;
  }

  selectChangeHandler = field => (value, action) => {
      /**
       * select-option insere valor em state do parent
       * pop-value/remove-value retira valor em state do parent
       * Opções tem atributo value alterado para atender multi-seleção com
       * permissão de duplicação de itens
       */
      if (action.action === 'select-option') {
        const adicional = {
          ...action.option,
          value: action.option.value + '_' + Math.floor(Date.now()/1000)
        };
        this.props.addAdicional(adicional);
      } else if (action.removedValue && (action.action === 'pop-value' || action.action === 'remove-value')) {
        this.props.remAdicional(action.removedValue.value);
      }
  }

  selectBlurHandler = field => (value, action) => {
      if (action.action === 'input-blur') {
          const event = {
              target: {
                  name: field
              }
          };
          this.props.inputBlurHandler(event);
      }
  }

  selectOnKeyDown = (e) => {
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
    return (
      <div className={`col-sm-12 ${classes.PassoAdicionais}`}>
          <Form.Group className="row">
              <div className="col-lg-12 col-md-12">
              <Select
                  autoFocus
                  value={this.props.selectedAdicionais.value}
                  options={this.getSelectAdicionais()}
                  onChange={this.selectChangeHandler('adicionais')}
                  onInputChange={this.selectBlurHandler('adicionais')}
                  onKeyDown={this.selectOnKeyDown} // último contém validação/conclusão em tab
                  isClearable
                  isSearchable
                  placeholder="Selecione os adicionais"
                  isMulti
                  isInvalid={this.props.selectedAdicionais.touched && this.props.selectedAdicionais.invalid}
                  invalidFeedback={this.props.selectedAdicionais.error}
                  innerRef={this.adicionaisRef}
                  hideSelectedOptions={false} // ajuste para duplicar seleção de itens
                  isOptionSelected={() => false} // utilizado para não marcar selecionados
              />
              </div>
          </Form.Group>
      </div>
    );
  }
}

export default PassoAdicionais;
