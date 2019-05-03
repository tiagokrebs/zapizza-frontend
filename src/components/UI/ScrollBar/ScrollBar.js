import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

/*
* Componente wrapper para perfect-scrollbar
* utilizado para personalização no estilo Zapizza do Componente
* e visualização em componentes da UI
*/
const scrollBar = (props) => (
  <PerfectScrollbar>
    {props.children}
  </PerfectScrollbar>
);

export default scrollBar;
