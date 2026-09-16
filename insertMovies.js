const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Movie = require("./models/Movie");

dotenv.config();

const movies = [
    {
        title: "Baahubali: The Beginning",
        language: "Telugu",
        year: 2015,
        genre: "Action",
        director: "S. S. Rajamouli",
        actors: ["Prabhas", "Rana Daggubati", "Anushka Shetty"],
        rating: 8.0,
        image: "/images/baahubali.jpg",
        description: "A young man discovers his royal heritage and his destiny."
    },
    {
        title: "RRR",
        language: "Telugu",
        year: 2022,
        genre: "Action",
        director: "S. S. Rajamouli",
        actors: ["N. T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt"],
        rating: 8.0,
        image: "/images/rrr.jpg",
        description: "Two revolutionaries join forces against British rule."
    },
    {
        title: "Pushpa: The Rise",
        language: "Telugu",
        year: 2021,
        genre: "Action",
        director: "Sukumar",
        actors: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
        rating: 7.6,
        image: "/images/pushpa.jpg",
        description: "A coolie rises through the world of red sandalwood smuggling."
    },
    {
        title: "Jersey",
        language: "Telugu",
        year: 2019,
        genre: "Sports Drama",
        director: "Gowtam Tinnanuri",
        actors: ["Nani", "Shraddha Srinath", "Sathyaraj"],
        rating: 8.5,
        image: "/images/jersey.jpg",
        description: "A former cricketer decides to return to the game for his son."
    }
];

async function insertMovies() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Movie.deleteMany({});

        await Movie.insertMany(movies);

        console.log("Movies inserted successfully");

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
}

insertMovies();