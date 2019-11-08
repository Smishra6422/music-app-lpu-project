const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema( {
    title: {
        type : String,
        required : true
    },
    artist:  mongoose.Schema.Types.ObjectId,
        
    
    genre:mongoose.Schema.Types.ObjectId,
       
    artworkPath: {
        type : String,
        required: true
    }
} )

const Album = mongoose.model('album', albumSchema)

module.exports = Album