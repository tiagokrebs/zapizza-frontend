import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import AuthToolbar from '../../components/Navigation/AuthToolbar/AuthToolbar';
//import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
    // state = {
    //     showSideDrawer: false
    // }

    // sideDrawerClosedHandler = () => {
    //     this.setState( { showSideDrawer: false } );
    // }

    // sideDrawerToggleHandler = () => {
    //     this.setState( ( prevState ) => {
    //         return { showSideDrawer: !prevState.showSideDrawer };
    //     } );
    // }

    render () {
        // return (
        //     <Aux>
        //         <Toolbar 
        //             isAuth={this.props.isAuthenticated}
        //             drawerToggleClicked={this.sideDrawerToggleHandler} />
        //         <SideDrawer
        //             isAuth={this.props.isAuthenticated}
        //             open={this.state.showSideDrawer}
        //             closed={this.sideDrawerClosedHandler} />
        //         <main className={classes.Content}>
        //             {this.props.children}
        //         </main>
        //     </Aux>
        // )

        let toolbar;
        if (!this.props.isAuthenticated) {
            toolbar = <Toolbar isAuthenticated={this.props.isAuthenticated} />;
        } else {
            toolbar = <AuthToolbar />;
        }

        return (
            <Aux>
                {toolbar}
                <main className={classes.Content}>
                    <div className="container">
                        {this.props.children}
                    </div>
                    <Footer/>
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Layout);