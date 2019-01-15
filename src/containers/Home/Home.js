import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../components/Page/PageTitle/PageTitle';
import classes from './Home.module.css'

class Home extends Component {
    render () {
        let pageTitle = <PageTitle 
                            title={'Bem vindo ao Zapizza caro ' + this.props.user.firstName}
                            subtitle='Vamo dale, agora com React'/>

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