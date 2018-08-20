const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport') //responsible for login --> see login middleware for more details or their documentation
const flash = require('connect-flash')
const app = express()

//App configurations settings
app.use(express.static(__dirname + '/public')) //serve everythin in the pblic folder to the browser
app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})) //establish a session 
app.use(bodyParser.urlencoded({ extended: false })) //parses body of request for data that might be sent
app.use(bodyParser.json())
app.use(passport.initialize()) // initailize passport module that will be use in login
app.use(passport.session()) //give passport the ok to set sessions

//engine configurations
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(flash())

//route configurations 
app.use(require('./middlewares/login'))
app.use(require('./controller/index'))
app.use(require('./controller/dashboard'))
app.use(require('./controller/register'))
app.use(require('./controller/create'))
app.use(require('./controller/logout'))
app.use(require('./controller/notfound'))




app.listen(process.env.PORT, process.env.HOST, () => console.log(`server running on ${process.env.PORT}`))
