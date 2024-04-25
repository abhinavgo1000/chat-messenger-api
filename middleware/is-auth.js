module.exports = (req, res, next) => {
    if(!req.sessions.isLoggedIn) {
        return res.redirect('/auth');
    }
    next();
};
