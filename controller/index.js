const router = require('express').Router() // look at express X4 docs for more

router.get('/', (req, res) => {
    console.log('index page requested at ' + Date())
    res.render('homepage', {
        hello: 'Login',
        errors: req.flash('error')[0]
    })
})

module.exports = router
