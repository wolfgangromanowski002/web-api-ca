import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
    });
    useEffect(() => {
        if (auth.token) {
            setAuth(prevState => ({
                ...prevState,
                isAuthenticated: true,
                loading: false,
                user: { },
            }));
        } else {
            setAuth(prevState => ({
                ...prevState,
                isAuthenticated: false,
                loading: false,
                user: null,
            }));}
    }, [auth.token]);

const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({
            token,
            isAuthenticated: true,
            loading: false,
            user: null, });};

const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,});
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>);
};