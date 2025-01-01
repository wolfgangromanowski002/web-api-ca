import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from './Spinner'; 
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                auth.loading ? (
                    <Spinner />
                ) : auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }} />
                )
            }
        />
    );
};

export default PrivateRoute;
