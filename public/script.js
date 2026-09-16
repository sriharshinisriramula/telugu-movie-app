const moviesContainer = document.getElementById("movies");
const movieCount = document.getElementById("movieCount");
const teluguCount = document.getElementById("teluguCount");
const totalMovies = document.getElementById("totalMovies");
const search = document.getElementById("search");

async function loadMovies(url = "/api/movies") {

    const response = await fetch(url);
    const movies = await response.json();

    displayMovies(movies);
}

function displayMovies(movies) {

    moviesContainer.innerHTML = "";

    totalMovies.textContent = movies.length + " Movies";

    movies.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p>${movie.year} • ${movie.genre}</p>

                <p>Director: ${movie.director}</p>

                <p class="movie-rating">
                    ⭐ ${movie.rating}
                </p>
            </div>
        `;

        moviesContainer.appendChild(card);
    });
}

async function loadStats() {

    const response = await fetch("/api/stats");
    const data = await response.json();

    movieCount.textContent = data.totalMovies;
    teluguCount.textContent = data.teluguMovies;
}

search.addEventListener("input", function() {

    const value = search.value.trim();

    if (value === "") {
        loadMovies();
    } else {
        loadMovies("/api/movies/search?search=" + value);
    }
});

loadMovies();
loadStats();