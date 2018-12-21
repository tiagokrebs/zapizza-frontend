import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const authRoute = (props) => {
        if (!props.isAuthenticated) {
            return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        }

        return <Route exact path={props.path} component={props.component}/>
}

export default authRoute;