import express from 'express';
import asyncHandler from 'express-async-handler';
import User from './userModel';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));


router.post('/register', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ success: false, msg: 'Username already exists.' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ success: true, msg: 'User successfully registered.' });
}));


router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
    }

    const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ success: true, token: 'BEARER ' + token });
}));


// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
}));
export default router;
/*
// Register/Create or Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
}));

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}
*/




