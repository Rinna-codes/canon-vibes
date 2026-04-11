const mongoose = require('mongoose');

// define the schema for the soundtrack card
const cardSchema = new mongoose.Schema({
    superheroName: {type: String, required:true},
    characterRealName: String,
    comicVineID: {type: Number, required: true},
    characterImage: {type: String, required: true},
    moodBoard: [String],
    spotifyPlaylist: {type: String, required:true},
    vibeTags: {type:[String], required:true},
    characterQuote: {type: String, required: true},
    fanficNotes: {type: String, required: true},
    mediaPoster: {type: String, required:true},
    personalReview: {type: String, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // stores ID that looks at a document among users
    characterVersion: {type: String, required:true}
});

module.exports = mongoose.model('Card', cardSchema); 