const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/users.js')
const router = require('express').Router()
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


passport.use(new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return done(null, false, { message: 'Please enter a valid username or password' })
        }
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                //console.log('login failed for username: ', username)
                return done(null, false, { message: 'username does not exist' });
            }
            if (user.password != User.hash(password)) {
                //console.log('login failed for username: ', username)
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('some error happened')
        }
        if (!user) {
            console.log('cant find user')
        }
        const myUser = {
            username: user.username,
            id: user.id
        }
        done(null, myUser);
    })

});

router.post('/login', [
        check('username', 'you must provide a valid username')
        .exists()
        .isLength({ min: 1 }),
        sanitize('username'),
        sanitize('password'),
        check('password', 'you must provide a password')
        .isLength({ min: 8 })
        .matches(/\d/)
    ],

    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })
)

module.exports = router
