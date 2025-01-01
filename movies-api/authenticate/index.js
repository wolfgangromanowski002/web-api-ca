import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (req, res, next) => {
    try { 
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, msg: 'No authorization header provided.' });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, msg: 'Bearer token not found.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        
        if (process.env.NODE_ENV === 'development') {
            console.log('Decoded JWT:', decoded);
        }
        const user = await User.findByUsername(decoded.username); 
        if (!user) {
            return res.status(401).json({ success: false, msg: 'User not found.' });
        }

        req.user = user; 
        next();
    } catch(err) {
        console.error('Authentication Error:', err.message);
        res.status(401).json({ success: false, msg: `Authentication failed: ${err.message}` });
    }
};

export default authenticate;
