import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import tamanhoReducer from './store/reducers/tamanho';
import saborReducer from './store/reducers/sabor';
import bordaReducer from './store/reducers/borda';
import adicionalReducer from './store/reducers/adicional';
import clienteReducer from './store/reducers/cliente';
import pedidoReducer from './store/reducers/pedido';
import { loginCheck } from './store/actions';

const history = createBrowserHistory();

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const rootReducer = (history) => combineReducers({
    auth: authReducer,
    router: connectRouter(history),
    user: userReducer,
    tamanho: tamanhoReducer,
    sabor: saborReducer,
    borda: bordaReducer,
    adicional: adicionalReducer,
    cliente: clienteReducer,
    pedido: pedidoReducer
  })

const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
));

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

const render = () => {
    ReactDOM.render(app, document.getElementById('root'));
    serviceWorker.unregister();

};

store.dispatch(loginCheck())
 .then(() => {
    render();
 });

// ReactDOM.render(app, document.getElementById('root'));
// serviceWorker.unregister();
