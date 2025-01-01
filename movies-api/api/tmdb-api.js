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


    router.get('/popular', async (req, res) => {
        try {
            const popularMovies = await tmdbApi.getPopularMovies();
            res.status(200).json(popularMovies);
        }catch (error) {
            res.status(500).json({ message: error.message });
        }});
    

};
