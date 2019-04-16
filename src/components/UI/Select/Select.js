import React from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import debounce from 'debounce-promise';
import Highlighter from 'react-highlight-words';

// https://react-select.com/

// import classes from './Select.module.css';

// propriedades CSS simulam estilo Zapizza
const colourStyles = {
    control: (styles, state) => {
        return {
            ...styles,
            borderRadius: '.25rem',
            minHeight: 38,
        };
    }
};

// tema simula estilo Zapizza
const theme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        primary: '#594336',
        primary75: '#8a7b72',
        primary50: '#bcb3ae',
        primary25: '#eeecea',
        neutral20: '#594336',
    }
});

// marcação de texto selecionado
const formatOptionLabel = ({label}, {inputValue}) => {
    return (
      <Highlighter
        searchWords={[inputValue]}
        textToHighlight={label}
        highlightStyle={{fontWeight: 'bold', backgroundColor: '#eeecea', color: '#392b23'}}
      />
    );
  }

const keyDownHandler = (refName, e) => {
    console.log('refname', refName.key, refName.keyCode, refName.type);
    // prints either LoginInput or PwdInput
}
  

const select = (props) => {
    // decisão por método debounce-promisse
    let loadOptions;
    if (!props.debouncedLoad) {
        loadOptions = props.loadOptions
    } else {
        loadOptions = debounce((inputValue) => props.loadOptions(inputValue), props.wait, {leading: true});
    }

    return (
        !props.async ? (
            <Select 
                styles={colourStyles}
                theme={theme}
                options={props.options}
                isClearable={props.isClearable}
                isSearchable={props.isSearchable}
                placeholder={props.placeholder}
                isMulti={props.isMulti}
                onInputChange={props.handleInputChange}
                onChange={props.onChange}
                formatOptionLabel={formatOptionLabel}/> 
        ) : (
            <AsyncSelect 
                styles={colourStyles}
                theme={theme}
                isClearable={props.isClearable}
                isSearchable={props.isSearchable}
                placeholder={props.placeholder}
                noOptionsMessage={props.noOptionsMessage}
                loadingMessage={props.loadingMessage}
                cacheOptions={props.cacheOptions}
                defaultOptions={props.defaultOptions}
                loadOptions={inputValue => loadOptions(inputValue)}
                isMulti={props.isMulti}
                onInputChange={props.onInputChange}
                onChange={props.onChange}
                onKeyDown={keyDownHandler}
                formatOptionLabel={formatOptionLabel}/>)
    );
}

export default select;