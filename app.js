const express = require('express')
const indexRoute = require('./routes/index')
const userRoute = require('./routes/users')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session');
const path = require('path')
const flash = require('connect-flash');
const albumData = require('./data/album')
const app = express()


// passport config
require('./config/passport')(passport)

// DB config
const db = require('./config/keys').mongoURI


// MOngoose Connect
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MOngoose Connected'))
.catch((err) => console.log(err))

// BODY PARSER
app.use(express.urlencoded( { extended: false }))

// Express Session
   
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Make sure this comes after the express session   
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
    
// Connect flash
app.use(flash());
    
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');  // Message from the successfully logout  // Var Name ( success_msg )
  res.locals.error_msg = req.flash('error_msg');    // Message from the auth.js when there is no login // Var Name ( error-msg )
  res.locals.error = req.flash('error');  // Message from the passport.js it will give the error globlaly with ( error ) Var Name
  next();
});
 

const PORT = process.env.PORT || 3000

// Static css file
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'data')))




// EJS
app.use(expressLayout)
app.set('view engine', 'ejs')




// ROUTER
app.use(indexRoute)
app.use(userRoute)


app.use((req,res) => {
  res.status(404).send('404 Page not found!')
})

// const newSong = new Song({
//   title:'shu',
//   artist: mongoose.Types.ObjectId(),
//   album: mongoose.Types.ObjectId(),
//   genre: mongoose.Types.ObjectId(),
//   duration:'2.5',
//   path:'hi',
//   albumOrder:2,
//   plays:5

// })

// newSong.save()

// async function msg() {
//   const msg = await Album.find({});
//   console.log('Message:', msg);
// }

// var albumData;
// Album.find({})
// .then(user => {
//   await albumData=user
// })

// msg()

// console.log(albumData);


app.listen(PORT, () => {
    console.log(`server is listining at port ${PORT}`);
    
})
