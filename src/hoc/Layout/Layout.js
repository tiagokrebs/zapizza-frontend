import React, { Component } from 'react';
import { connect } from 'react-redux';

import HocAux from '../hocAux/hocAux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import OrderSideDrawer from '../../components/Navigation/OrderSideDrawer/OrderSideDrawer';
import Footer from '../../components/Page/Footer/Footer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showNewOrder: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    newOrderCloseHandler = () => {
        this.setState( { showNewOrder: false });
    }

    newOrderHandler = () => {
        this.setState( { showNewOrder: true });
    }

    render () {
        return (
            <HocAux>
                <Toolbar 
                    isAuthenticated={this.props.isAuthenticated} 
                    userName={this.props.userName}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    newOrderClicked={this.newOrderHandler} />
                <SideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    userName={this.props.userName}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <OrderSideDrawer 
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showNewOrder}
                    closed={this.newOrderCloseHandler} />
                <main className={classes.Content}>
                    <div className="container">
                        {this.props.children}
                    </div>
                    <Footer/>
                </main>
            </HocAux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userName: state.user.firstName + ' ' + state.user.lastName
    };
};

export default connect(mapStateToProps)(Layout);