const mongoose = require('mongoose')

const songSchema = new mongoose.Schema( {
    title: {
        type : String,
        required : true
    },
    artist:  mongoose.Schema.Types.ObjectId,
        
    album:mongoose.Schema.Types.ObjectId,

    genre:mongoose.Schema.Types.ObjectId,

    duration: {
        type : String,
        required : true
    },
    path: {
        type : String,
        required : true
    },
    albumOrder: {
        type : Number,
        required : true
    },
       
    plays: {
        type : Number,
        required: true
    }
} )

const Song = mongoose.model('song', songSchema)

module.exports = Song