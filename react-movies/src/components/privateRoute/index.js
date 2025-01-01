import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !auth.loading && auth.isAuthenticated ? (
                    <Component {...props} />
                            ) : (
                    <Redirect to="/login" />)}/>);};

export default PrivateRoute;
