const { response } = require('express');

const router = require('express').Router();


const autoCheck = (req, res, next) => {
    if (!req.User) {
        //if user is not logged in
        response.redirect('/auth/login');
    } else {
        //if logged in
        next();
    }
}
router.get('/', (req, res) => {
    res.render('profile', { user: req, user });
})

module.exports = router;