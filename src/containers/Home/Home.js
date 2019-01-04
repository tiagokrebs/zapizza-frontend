import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css'

class Home extends Component {
    render () {
        let pageTitle = (
            <div className="row align-items-center justify-content-between">
                <div className={`col-11 col-sm-12 page-title ${classes.Title}`}>
                    <h3>Bem vindo ao Zapizza caro {this.props.user.firstName}</h3>
                    <p>Vamo dale, agora com React</p>
                </div>
            </div>
        );

        if (!this.props.isAuthenticated) {
            pageTitle = null;
        }

        let pageContent = (
            <div className="row">
                    <div className="col-sm-12">
                        <div className={`card ${classes.Card}`}>
                            <div className={`card-header ${classes.CardHeader}`}>
                                <h6 className={`card-title ${classes.CardTitle}`}>Página em branco</h6>
                            </div>
                            <div className="card-body"></div>
                        </div>
                    </div>
                </div>
        );

        if (!this.props.isAuthenticated) {
            pageContent = null;
        }

        return (
            <div>
                {pageTitle}
                {pageContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.user
    };
};

export default connect(mapStateToProps, null)(Home);