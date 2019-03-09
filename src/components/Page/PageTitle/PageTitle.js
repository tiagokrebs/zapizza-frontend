import React from 'react';

import classes from './PageTitle.module.css';

const pageTitle = (props) => (
    <div className="row align-items-center justify-content-between">
        <div className={`col-11 col-sm-12 page-title ${classes.Title}`}>
            <span>
                <i className={props.icon}></i>
                <h3>{props.title}</h3>
            </span>
            <p>{props.subtitle}</p>
        </div>
    </div>
);

export default pageTitle;