import React from 'react';

// import classes from './BadError.module.css';

const badError = (props) => {
    return (
        <div>
            <div className="container text-center">
                <h2>Ops, algo deu errado <span role="img" aria-label="thinking-face">🤔</span></h2>
                <h1>{props.error ? props.error.message : null}</h1>
            </div>
        </div>
    );
};

export default badError;