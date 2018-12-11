import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';

class Confirm extends Component {
    componentWillMount () {
        console.log('params', this.props.match);
        const token = this.props.match.params.token;
        this.props.onConfirm(token);
    }

    render () {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onConfirm: (token) => dispatch(actions.confirm(token))
    };
};

export default connect(null, mapDispatchToProps)(Confirm);