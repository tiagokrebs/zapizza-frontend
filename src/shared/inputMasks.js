import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// baseado em https://github.com/text-mask

export const moedaReal2Dec = createNumberMask({
    prefix: 'R$ ',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: true,
    allowLeadingZeroes: true
});

export const moeda2Dec = createNumberMask({
    prefix: '$ ',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: false,
    allowLeadingZeroes: false
});

// considere tipo postgreSQL numeric(precision, scale)
// precision 6, scale 2. Exemplo 1268,97
export const valorP6S2 = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
    integerLimit: 4,
    requireDecimal: false,
    allowLeadingZeroes: false
});

// funções unmask são necessárias para a alteração dos dados dos inputs
// para tipos aceitáveis objetos json
export const valorP6S2Unmask = (value) => {
    let newValue = value.toString().replace(/\./g, '');
    newValue = newValue.toString().replace(/,/g, '.');
    return newValue;
}

// retorno tipo react-text-mask
// há um problema com esse formato, ao digitar o caractere separador dos decimais
// ele não é preenchido até que as 4 casas do lado inteiro tenham sido informadas
export const valorP6S2DEP = (rawValue) => {
    return [/\d/, /\d/, /\d/, /\d/, ',', /\d/, /\d/]
};

// Telefone
export const telefone = (rawValue) => {
    // é necessário retirar a máscara quando rawVaue vem mascarado
    const value = rawValue.toString().replace(/[^0-9]/g, '');
    if (value.length < 11) {
        return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]    
    }
    return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
};

export const unmaskOnlyNumbers = (value) => {
    let newValue = value.toString().replace(/[^0-9]/g, '');
    return newValue;
};

// CEP
export const cep = (rawValue) => {
    return [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
};