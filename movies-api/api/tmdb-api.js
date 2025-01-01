import fetch from 'node-fetch';
export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || 'Failed to fetch upcoming movies');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getPopularMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || 'failed to fetch popular movies');}

        return await response.json();
    } catch (error) {
        throw error;}
};

export const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || 'Failed to search movies');
        }

return await response.json();
    } catch (error) {
        throw error;}
};


// **New Function: Get Genres from TMDB**
export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || 'Failed to fetch genres');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }


    
};
