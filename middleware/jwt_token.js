require('dotenv').config();
const JWT = require("jsonwebtoken");

const generateToken = (req, res, next) => {
    const payload = {
        name: 'rifki',
        role: 'admin'
    };

    const optionJwt = {
        expiresIn: '15s',
    };

    const tokenSecret = JWT.sign(payload, process.env.TOKEN_SECRET, optionJwt);
    return tokenSecret;
};

module.exports = { generateToken }; 