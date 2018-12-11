import React from 'react';

// import classes from './NotFound.module.css';

// emoji de emojipedia.org

const notFound = () => {
    return (
        <div>
            <div className="container text-center">
                <h2>Ops, página não encontrada <span role="img" aria-label="slightly-frowning-face">🙁</span></h2>
            </div>
        </div>
    );
}

export default notFound;
