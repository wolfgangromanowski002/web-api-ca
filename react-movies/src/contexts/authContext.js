import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
    });

    useEffect(() => {
        const initializeAuth = async () => {
            if (auth.token) {
                try {
                    const decoded = jwtDecode(auth.token);
                    setAuth(prevState => ({
                        ...prevState,
                        isAuthenticated: true,
                        loading: false,
                        user: { username: decoded.username, id: decoded.id }, // Populate with decoded info
                    }));} catch (error) {
                    console.error('Invalid token:', error);
                    logout();}
            } else {
                setAuth(prevState => ({
                    ...prevState,
                    isAuthenticated: false,
                    loading: false,
                    user: null,
                }));}};

        initializeAuth();
    }, [auth.token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({
            token,
            isAuthenticated: true,
            loading: false,
            user: null, 
        });};

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,});};

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );};
