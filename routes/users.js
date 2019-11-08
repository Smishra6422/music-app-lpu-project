const express = require('express')

const route = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

// LOGI PAGE

route.get('/users/login', (req, res) => {
    res.render('login', {
        errmsg: req.flash('message')
    })
})

route.get('/users/register', (req, res) => {
    res.render('register')
})

route.post('/users/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    // Check All Fields
    if( !name || !email || !password || !password2) {
        errors.push( { msg: 'Please fill all the field' } )
    }

    // Check Password Match
    if(password !== password2) {
        errors.push ({ msg: "password should be equal"})
    }

    // Check Password length
    if(password.length < 6) {
        errors.push ({ msg: "password length should be 6 or more"})
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {

       User.findOne({ email: email})
            .then(user =>{

                if(user) {
                    errors.push({ msg: 'Email already exists!'})
                    res.render('register', {
                     errors,
                     name,
                     email,
                     password,
                     password2
                 })
         
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err

                            newUser.password = hash
                            console.log(newUser.password);
                            newUser.save()
                                .then(user => res.redirect('/users/login'))
                                .catch(err => console.log(err))
                            
                        })
                    })
                   
                }
            })

    }
})

// Login handle
route.post('/users/login', (req, res, next) => {
    passport.authenticate('local', {
       // session:false,
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
       failureFlash: true
    })(req, res, next) 
})

// Logout Handle
route.get('/users/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})

 module.exports = route