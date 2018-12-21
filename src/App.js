import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Register from './containers/Auth/Register/Register';
import Confirm from './containers/Auth/Register/Confirm/Confirm';
import AuthRoute from './components/AuthRoute/AuthRoute';
import NotFound from './components/HttpExceptions/NotFound/NotFound';
import Forbidden from './components/HttpExceptions/Forbidden/Forbidden';
import BadError from './components/HttpExceptions/BadError/BadError';
import * as actions from './store/actions/auth';

// const asyncRegister = asyncComponent(() => {
//   return import('./containers/Register/Register');
// });

class App extends Component {
  // componentDidMount () {
  //   if (this.props.pathname !== '/logout') {
  //    this.props.tryAutoLogin();
  //   }
  // }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Auth}/>
        <Route path="/logout" exact component={Logout}/>
        <Route path="/registro" exact component={Register}/>
        {/* <Route path="/confirma/:token" exact component={Confirm}/> */}
        <Route path="/ops" exact component={BadError}/>
        <Route path="/forbidden" component={Forbidden} />
        <AuthRoute path="/confirma/:token" component={Confirm} isAuthenticated={this.props.isAuthenticated} />
        {/* <PrivateRoute path='/confirma/:token' component={Confirm} /> */}
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
