const express = require('express')
const { checkAuthenticated } = require('../config/auth')
const route = express.Router()
const albumData = require('../data/album')
const artistData = require('../data/artist')
const songData = require('../data/song')

// Welcome page
route.get('/', (req, res) => {
    res.render('welcome')
})

// Dashboard page //, checkAuthenticated
route.get('/dashboard',checkAuthenticated ,(req, res) => {
    res.render('dashboard',{
        albumData:albumData,
        songData,
        artistData
    })
})

route.get('/album', checkAuthenticated,(req, res) => {
    const id  = req.query.data
    if(!id) {
        res.redirect('/dashboard')
    }
    res.render('album', {
        id,
        albumData:albumData,
        artistData,
        songData
    })
})

route.get('/search',checkAuthenticated,(req, res) => {
    res.render('search')
})
// console.log(albumData);




 module.exports = route