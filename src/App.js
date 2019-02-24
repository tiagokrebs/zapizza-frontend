import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import AuthRoute from './components/AuthRoute/AuthRoute';
import NotFound from './components/Page/HttpExceptions/NotFound/NotFound';
import Forbidden from './components/Page/HttpExceptions/Forbidden/Forbidden';
import BadError from './components/Page/HttpExceptions/BadError/BadError';
import Logout from './containers/Auth/Logout/Logout';
import Register from './containers/Auth/Register/Register';
import Confirm from './containers/Auth/Register/Confirm/Confirm';
import Forgot from './containers/Auth/Forgot/Forgot';
import Reset from './containers/Auth/Forgot/Reset/Reset';
import Profile from './containers/Profile/Profile';
import Tamanho from './containers/Pizza/Tamanho/Tamanho';
import Sabor from './containers/Pizza/Sabor/Sabor';
import Borda from './containers/Pizza/Borda/Borda';
import Bebida from './containers/Bebida/Bebida';
import * as actions from './store/actions/auth';

// const asyncRegister = asyncComponent(() => {
//   return import('./containers/Register/Register');
// });

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Auth}/>
        <Route path="/logout" exact component={Logout}/>
        <Route path="/registro" exact component={Register}/>
        <Route path="/ops" exact component={BadError}/>
        <Route path="/forbidden" component={Forbidden} />
        <AuthRoute path="/confirma/:token" component={Confirm} isAuthenticated={this.props.isAuthenticated} />
        <AuthRoute path="/perfil" component={Profile} isAuthenticated={this.props.isAuthenticated} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/reset/:token" exact component={Reset} />
        <AuthRoute path="/tamanhos" component={Tamanho} isAuthenticated={this.props.isAuthenticated} />
        <AuthRoute path="/sabores" component={Sabor} isAuthenticated={this.props.isAuthenticated} />
        <AuthRoute path="/bordas" component={Borda} isAuthenticated={this.props.isAuthenticated} />
        <AuthRoute path="/bebidas" component={Bebida} isAuthenticated={this.props.isAuthenticated} />
        <Route component={NotFound}/>        
      </Switch>
    );

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.loginCheck())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
