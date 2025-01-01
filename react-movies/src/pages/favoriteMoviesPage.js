
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Spinner from "../components/spinner";

const FavoriteMoviesPage = () => {
    const { auth } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('/api/movies/favorite', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth.token,
                    },});
                const data = await response.json();
                if (response.ok) {
                    setFavorites(data);
                } else {
                    setError(data.msg || 'Failed to fetch favorite movies.');
                }
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('An error occurred while fetching favorite movies.');
            } finally {
                setLoading(false);
            }
        };

        if (auth.isAuthenticated) fetchFavorites(); else setLoading(false);
    }, [auth]);

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <div className="error-container"><h1>{error}</h1></div>
    }

    if (favorites.length === 0) {
        return <h1>No favorite movies added yet!</h1>
    }

    return (<PageTemplate title="Favorite Movies" movies={favorites} action={(movie) => (<><RemoveFromFavorites movie={movie} /><WriteReview movie={movie} /></>)} />);
};

export default FavoriteMoviesPage;
