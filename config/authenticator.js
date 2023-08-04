const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

exports.generateAccessToken = (username) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    return jwt.sign({username: username}, tokenSecret, { expiresIn: '1800s' });
}
