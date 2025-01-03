import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MoviesContextProvider from './contexts/movieContext';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FavoriteMoviesPage from './pages/FavoriteMoviesPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import NotFound from './pages/NotFound'; 

function App() {
    return (
        <AuthProvider>
            <MoviesContextProvider>
                <Router>
                    <Header /> 
                    <Switch>
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/favorite-movies" component={FavoriteMoviesPage} />
                        <PrivateRoute exact path="/movies/top_rated" component={TopRatedMoviesPage} />                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </MoviesContextProvider>
        </AuthProvider>
    );}

export default App;
