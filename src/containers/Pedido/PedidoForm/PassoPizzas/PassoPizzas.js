import React from 'react';

import PassoPizza from './PassoPizza';

/**
 * Componente stateless para montagem 1:N pizas do pedido
 * @param {*} props 
 */
const passoPizzas = (props) => (
    props.pizzas.map((pizza, index) => {
        return <PassoPizza 
                    {...props}
                    key={index}
                    pizza={props.pizzas[index]}
                    pizzaId={index}
                    />
    })
)

export default passoPizzas;