const router = require('express').Router() // look at express X4 docs for more

router.get('/dashboard', (req, res) => {
    // if (req.user) {
    //console.log(req.session)
    // console.log(`sending dashboard to username: ${req.user.username}`)
    res.render('dashboard', req.user)
    //}
    // else {
    //     res.status(404).render('notFound')
    // }
})

module.exports = router
