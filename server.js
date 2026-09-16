const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const Movie = require("./models/Movie");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/api/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies" });
    }
});

app.get("/api/movies/search", async (req, res) => {
    try {
        const search = req.query.search || "";

        const movies = await Movie.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { director: { $regex: search, $options: "i" } },
                { actors: { $regex: search, $options: "i" } }
            ]
        });

        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Search error" });
    }
});

app.post("/api/movies", async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();

        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: "Error adding movie" });
    }
});

app.delete("/api/movies/:id", async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie" });
    }
});

app.get("/api/stats", async (req, res) => {
    try {
        const totalMovies = await Movie.countDocuments();

        const teluguMovies = await Movie.countDocuments({
            language: "Telugu"
        });

        const topMovie = await Movie.findOne()
            .sort({ rating: -1 });

        res.json({
            totalMovies,
            teluguMovies,
            topMovie
        });
    } catch (error) {
        res.status(500).json({ message: "Error loading statistics" });
    }
});

app.listen(5001, () => {
    console.log("Server running at http://localhost:5001");
});