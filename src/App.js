import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import AuthRoute from './components/AuthRoute/AuthRoute';
import NotFound from './components/HttpExceptions/NotFound/NotFound';
import Forbidden from './components/HttpExceptions/Forbidden/Forbidden';
import * as actions from './store/actions/auth';

const asyncRegister = asyncComponent(() => {
  return import('./containers/Register/Register');
});

const asyncConfirm = asyncComponent(() => {
  return import('./containers/Register/Confirm/Confirm');
});

class App extends Component {
  componentDidMount () {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Auth}/>
        <Route path="/registro" exact component={asyncRegister}/>

        <AuthRoute 
          path="/confirma/:token" 
          component={asyncConfirm} 
          isAuthenticated={this.props.isAuthenticated} 
          redirectTo="/login"
        />
        
        <Route path="/forbidden" exact component={Forbidden} />
        <Route path="/not-found" exact component={NotFound} />
        
        <Redirect to="/not-found"/>
      </Switch>
    );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //     <Switch>
    //       <Route path="/" exact component={Home} />
    //       <AuthRoute isAuthenticated={this.props.isAuthenticated} path="/logout" exact component={Home}/>
    //       <Route path="/not-found" exact component={NotFound} />
    //       <Redirect to="/not-found"/>
    //     </Switch>
    //   );
    // }
    
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.loginCheck())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
