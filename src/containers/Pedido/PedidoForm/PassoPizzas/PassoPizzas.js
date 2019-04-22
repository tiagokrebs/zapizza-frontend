import React from 'react';

import PassoPizza from './PassoPizza';

/**
 * Componente stateless para montagem 1:N pizas do pedido
 * @param {tamanhos, sabores, pizzas} props 
 */
const passoPizzas = (props) => (
    props.pizzas.map((pizza, index) => {
        return <PassoPizza 
                    key={index}
                    tamanhos={props.tamanhos}
                    sabores={props.sabores}
                    bordas={props.bordas}
                    pizza={props.pizzas[index]}
                    pizzaId={index}
                    inputChangeHandler={props.inputChangeHandler}
                    inputBlurHandler={props.inputBlurHandler}/>
    })
)

export default passoPizzas;