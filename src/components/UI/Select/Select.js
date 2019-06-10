import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import debounce from 'debounce-promise';
import Highlighter from 'react-highlight-words';
// import classes from './Select.module.css';

/**
 * https://react-select.com/
 */

// propriedades CSS simulam estilo Zapizza
const colourStyles = {
    control: (styles, state) => {
        return {
            ...styles,
            borderRadius: '.25rem'
        };
    }
};

// tema simula estilo Zapizza
const defaultTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: '#594336',
        primary75: '#8a7b72',
        primary50: '#bcb3ae',
        primary25: '#eeecea',
        neutral20: '#594336',
        neutral30: '#594336',
    }
});

// tema simula estilo Zapizza com erro no input
const defaultDangerTheme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: '#dc3545',
        primary75: '#8a7b72',
        primary50: '#bcb3ae',
        primary25: '#eeecea',
        neutral20: '#dc3545',
        neutral30: '#dc3545',
    }
});

// marcação de texto selecionado
const formatOptionLabel = ({label}, {inputValue}) => {
    return (
      <Highlighter
        searchWords={[inputValue]}
        textToHighlight={label ? label : ''}
        highlightStyle={{fontWeight: 'bold', backgroundColor: '#eeecea', color: '#392b23'}}
      />
    );
  }

const select = (props) => {
    // decisão por método debounce-promisse
    let loadOptions;
    if (!props.debouncedLoad) {
        loadOptions = props.loadOptions
    } else {
      /* Leading não tem comportamento esperado em componentes controlados,
      *  como o componente está dentro de um wrapper a cada renderização uma
      *  nova função é instancidada e todo novo caracter inserido acaba sendo
      *  o "primeiro" (o que dispara a função leading).
      *  Acumulate precisa de ajuste pois retorna array.
      */
      loadOptions = debounce((inputValue) => props.loadOptions(inputValue), props.wait, {leading: false, accumulate: false});
    }

    // alerta inferior ao input no estilo bootstrap
    let inputError;
    if (props.isInvalid) {
        inputError = (
            <div style={{display: 'block', marginTop: '.25rem', fontSize: '80%', color: '#dc3545'}}>
                {props.invalidFeedback}
            </div>
        )
    }

    return (
        !props.async ? (
            <div>
                <Select
                    autoFocus={props.autoFocus}
                    styles={colourStyles}
                    theme={props.isInvalid ? defaultDangerTheme : defaultTheme}
                    options={props.options}
                    isClearable={props.isClearable}
                    isSearchable={props.isSearchable}
                    isDisabled={props.isDisabled}
                    placeholder={props.placeholder}
                    isMulti={props.isMulti}
                    onInputChange={props.onInputChange}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    formatOptionLabel={formatOptionLabel}
                    getOptionValue ={(option)=>option.label}
                    value={props.value}
                    inputValue={props.inputValue}
                    ref={props.innerRef}
                    hideSelectedOptions={props.hideSelectedOptions}
                    tabSelectsValue={false}
                    isOptionSelected={props.isOptionSelected}
                    getOptionValue={props.getOptionValue} 
                    getOptionLabel={props.getOptionLabel}
                  />
                {inputError}
            </div>
        ) : (
            <div>
                <AsyncSelect
                    autoFocus={props.autoFocus}
                    styles={colourStyles}
                    theme={props.isInvalid ? defaultDangerTheme : defaultTheme}
                    isClearable={props.isClearable}
                    isSearchable={props.isSearchable}
                    isDisabled={props.isDisabled}
                    placeholder={props.placeholder}
                    noOptionsMessage={props.noOptionsMessage}
                    loadingMessage={props.loadingMessage}
                    cacheOptions={props.cacheOptions}
                    defaultOptions={props.defaultOptions}
                    loadOptions={inputValue => loadOptions(inputValue)}
                    isMulti={props.isMulti}
                    onInputChange={props.onInputChange}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    formatOptionLabel={formatOptionLabel}
                    value={props.value}
                    inputValue={props.inputValue}
                    ref={props.innerRef}
                    hideSelectedOptions={props.hideSelectedOptions}
                    tabSelectsValue={false}
                    isOptionSelected={props.isOptionSelected}
                    getOptionValue={props.getOptionValue} 
                    getOptionLabel={props.getOptionLabel}
                  />
                {inputError}
            </div>
        )
    );
}

export default select;
