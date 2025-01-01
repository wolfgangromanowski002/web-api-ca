import express from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate';
import User from '../users/userModel';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', authenticate, asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json(user.favorites);
}));
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const user = req.user;
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ success: false, msg: 'movie ID is required.' });}

    const movie = await movieModel.findByMovieDBId(movieId);
    if (!movie) {
        return res.status(404).json({ success: false, msg: ' not found.' });}

    if (user.favorites.some(m => m.id === movie.id)) {
        return res.status(409).json({ success: false, msg: ' already in favorites.' });}

    user.favorites.push(movie);
    await user.save();

    res.status(200).json({ success: true, msg: 'added to favorites.' });
}));
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
    const user = req.user;
    const movieId = parseInt(req.params.id, 10);

    user.favorites = user.favorites.filter(m => m.id !== movieId);
    await user.save();

    res.status(200).json({ success: true, msg: ' removed from favorites.' });
}));

export default router;
