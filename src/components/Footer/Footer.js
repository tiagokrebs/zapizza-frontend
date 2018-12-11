import React from 'react';

import classes from './Footer.module.css'

const footer = (props) => (
    <footer className={`${classes.Footer} content-between align-items-right`}>
        <div className="col-sm-16 text-right">
            <a href="/" target="_blank">Política de Privacidade</a>
            |
            <a href="/" target="_blank">Termos de Uso</a>
        </div>
    </footer>
);

export default footer;