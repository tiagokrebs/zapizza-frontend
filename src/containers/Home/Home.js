import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render () {
        return (
            <div>
                <p>Home :D</p>
                {this.props.isAuthenticated ? <p>Auntenticado</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(Home);