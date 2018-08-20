const router = require('express').Router()
router.get('/register', (req, res) => {
    res.render('register', { hello: 'Registration' })
})
module.exports = router
