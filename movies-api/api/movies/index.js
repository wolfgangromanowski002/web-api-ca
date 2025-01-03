import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getPopularMovies, searchMovies, getTopRatedMovies } from '../tmdb-api';

const router = express.Router();
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json({ success: true, data: upcomingMovies });
}));
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    try {
        const popularMovies = await getPopularMovies();
        res.status(200).json({ success: true, data: popularMovies });
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        res.status(500).json({ success: false, msg: 'Failed to fetch popular movies.' });
    }
}));
router.get('/tmdb/search', asyncHandler(async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ success: false, msg: 'Query parameter is required.' });
    }

    try {
        const searchResults = await searchMovies(query);
        res.status(200).json({ success: true, data: searchResults });
    } catch (error) {
        console.error('Error searching movies:', error.message);
        res.status(500).json({ success: false, msg: 'Failed to search movies.' });
    }
}));
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; 
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)]);
    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };

    res.status(200).json(returnObject);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json({ success: true, data: movie });
    } else {
        res.status(404).json({ success: false, msg: 'The movie you requested could not be found.' });
    }
}));
 
router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
  try {
    const topRated = await getTopRatedMovies();
    res.status(200).json({ success: true, data: topRated });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to fetch top-rated movies.' });
  }
}));

export default router;
