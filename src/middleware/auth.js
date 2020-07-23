const jwt = require("jsonwebtoken");
const logger = require('./../utils/logger');

const tokenValidation = (req, res, nextHandler) => {
    logger.debug("auth middleware")
    const accessToken = req.headers.authorization
    const JWT_SECRET_KEY = 'superrrrSecret';
    try {
        const tokenPayload = jwt.verify(accessToken, JWT_SECRET_KEY);
        res.locals.user = tokenPayload;
        nextHandler();
    } catch (error) {
        res.status(401).send({"error": error.message});
    }
}

module.exports = {
    tokenValidation
};