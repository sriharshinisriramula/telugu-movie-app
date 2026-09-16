const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    language: String,
    year: Number,
    genre: String,
    director: String,
    actors: [String],
    rating: Number,
    image: String,
    description: String
});

module.exports = mongoose.model("Movie", movieSchema);