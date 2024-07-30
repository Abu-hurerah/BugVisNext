const authorizeManager = (req, res, next) => {
    if (req.user.user_type !== 'manager') {
        return res.sendStatus(403); // Forbidden
    }
    next();
};
const authorizeQA = (req, res, next) => {
    if (req.user.user_type !== 'manager') {
        return res.sendStatus(403); // Forbidden
    }
    next();
};
const authorizeDeveloper = (req, res, next) => {
    if (req.user.user_type !== 'manager') {
        return res.sendStatus(403); // Forbidden
    }
    next();
};


module.exports = { authorizeManager,authorizeDeveloper, authorizeQA};
