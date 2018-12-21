import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';

class Confirm extends Component {
    componentDidMount () {
        const token = this.props.match.params.token;
        this.props.onConfirm(token);
    }

    render () {
        return <Redirect to="/" />
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onConfirm: (token) => dispatch(actions.confirm(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);