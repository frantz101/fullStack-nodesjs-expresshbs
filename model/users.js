const mongoose = require('mongoose')
const crypto = require('crypto')

const hash = password => {
    return crypto.createHash('sha1').update(password).digest('base64')
}


mongoose.connect('mongodb://admin:mypassword1@ds163680.mlab.com:63680/fullstack_todo', { useNewUrlParser: true }, (err) => {
    if (err) {
        return console.error(err)
    }
    console.log('connected to db')

    const userSchema = mongoose.Schema({
        email: String,
        username: String,
        password: String,
        date: String
    })
    const User = mongoose.model('user', userSchema)
    exports.findById = (id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const myUser = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            return cb(err, myUser)
        })
    }
    exports.create = (username, email, pswd, cb) => {
        let newUser = {
            username,
            email,
            password: hash(pswd),
            date: Date.now()
        }


        User.create(newUser, (err, user) => {
            cb(err, user)
        })

    }

    exports.findOne = (username, cb) => {
        User.findOne(username, (err, user) => {
            cb(err, user)
        })
    }
})


exports.hash = hash;
