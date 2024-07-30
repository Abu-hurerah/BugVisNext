const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ensure correct path to your User model

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded = jwt.verify(token, 'secret'); // Use your JWT secret
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(403); // Forbidden
    }
};

module.exports = { authenticateToken };
