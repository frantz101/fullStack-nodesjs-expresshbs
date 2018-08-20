const User = require('../model/users')
const router = require('express').Router()

router.post('/create', (req, res) => {
    console.log('received request: ', req)
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(200).send('error finding user')
        }
        if (user) {
            return res.send('user already exist')
        }
        return User.create(req.body.username, req.body.email, req.body.password, (err, user) => {
            if (err) {
                return res.status(200).send('error creating user')
            }
            if (user) {
                res.redirect('/dashboard')
            }


        })
    })

})




module.exports = router
