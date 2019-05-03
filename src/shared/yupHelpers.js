import updateObject from './updateObject';

/**
 * Objeto dicionário pt-br para Yup
 */
export const yupLocale = {
    mixed: {
        default: 'Campo inválido',
        required: 'Campo obrigatório',
        notType: 'Campo inválido tipo'
    }
}

/**
 * Função cria objeto para validação Yup com base em modelo
 * de inputs Zapizza armazenados em state de formulários
 *
 * todo: tornar método recursivo para objetos com N níveis
 * todo: arrays em atributo value (select) não tem tratamento específico
 * @param {*} inputs
 */
export const inputsToValidation = (inputs) => {
    let values = {};
    for (let key in inputs) {
        // para objetos tipo array com inputs filhos dos objetos
        if (Array.isArray(inputs[key])) {
            const arrayObjects = inputs[key].map((item) => {
                let values = {};
                for (let key in item) {
                    // todo valor é tratado como string
                    if (typeof(item[key].value) === 'string') {
                        values[key] = item[key].value.toString();
                    }
                    // valores podem ser objetos em caso de componentes select
                    if (typeof(item[key].value) === 'object') {
                        values[key] = item[key].value;
                    }
                }
                return values;
            });
            values[key] = arrayObjects;
        } else {
            // todo valor é tratado como string
            if (typeof(inputs[key].value === 'string')) {
                values[key] = inputs[key].value.toString();
            }
            // valores podem ser objetos em caso de componentes select
            if (typeof(inputs[key].value === 'object')) {
                values[key] = inputs[key].value;
            }
        }
    }
    return values;
}

/**
 * Função para reset das propriedades dos inputs para validação
 * atributos touched, invalid e error são alterados
 *
 * todo: remover função updateObject, alterar para spread operator
 */
export const inputsRestartValidity = (inputs) => {
    let updatedInputs = inputs;
    for (let key in inputs) {
        if (Array.isArray(inputs[key])) {
            const arrayObjects2 = inputs[key].map((item) => {
                for (let key2 in item) {
                    item[key2].touched = false
                    item[key2].invalid = false;
                    item[key2].error = null;
                }
                return item
            });
            updatedInputs = updateObject(updatedInputs, {
                [key]: arrayObjects2
            });
        } else {
            const updatedFormElement = updateObject(inputs[key], {
                touched: false,
                invalid: false,
                error: null
            });

            updatedInputs = updateObject(updatedInputs, {
                [key]: updatedFormElement
            });
        }
    }
    return updatedInputs;
}

export const inputsDefineErrors = (formElement, inputs) => {
    let updatedinputs = {};
    let updatedFormElement = {};
    let arrayObjects = [];
    const arrayPath = formElement.path.match(/[^\][.]+/g);
    let key = arrayPath[0];
    let index = parseInt(arrayPath[1]);
    let field = arrayPath[2];

    if (key != null && index != null && field != null) {
        // define erros em array de objetos do state
        arrayObjects = inputs[key].map((item, idx) => {
            if (idx === index) {
                for (let key2 in item) {
                    if (key2 === field) {
                        item[key2].touched = true;
                        item[key2].invalid = true;
                        item[key2].error = formElement.message;
                    }
                }
                return item
            }
            return item;
        });

        updatedinputs = updateObject(inputs, {
            [key]: arrayObjects
        });

    } else {
        // define erros em atributos na raiz do state
        updatedFormElement = updateObject(inputs[formElement.path], {
            touched: true,
            invalid: true,
            error: formElement.message
        });

        updatedinputs = updateObject(inputs, {
            [formElement.path]: updatedFormElement
        });
    }
    return updatedinputs;
}
