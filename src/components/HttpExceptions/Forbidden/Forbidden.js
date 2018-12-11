import React from 'react';

// import classes from './Forbidden.module.css';

const forbidden = () => {
    return (
        <div>
            <div className="container text-center">
                <h2>Ops, acesso não permitido <span role="img" aria-label="face-with-open-mouth">😯</span></h2>
            </div>
        </div>
    );
};

export default forbidden;