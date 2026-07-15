const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema ({
    title : {
        type : String,
        required : true,
    },
    artist : {
        type : String,
        required : true,
    },
    youtubeUrl : {
        type : String,
    },
    spotifyUrl : {
        type : String,
    },
    coverImage : {
        type : String,
    },
    views: {
    type: Number,
    default: 0
    },
    createdAt :{
        type: Date,
        default: Date.now
    }
    
})

const Song = mongoose.model('Song', SongSchema);
module.exports = Song