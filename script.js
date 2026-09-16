const grid = document.getElementById('movieGrid');
const countLabel = document.getElementById('movieCount');
const searchInput = document.getElementById('searchInput');

async function loadStats() {
  const res = await fetch('/api/stats');
  const stats = await res.json();
  document.getElementById('statMovies').textContent = stats.totalMovies;
  document.getElementById('statFilms').textContent = stats.teluguFilms;
}

async function loadMovies(query = '') {
  const res = await fetch(`/api/movies?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  renderMovies(data.movies);
  countLabel.textContent = `${data.count} Movies`;
}

function renderMovies(movies) {
  grid.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.genre} · ${movie.year}</p>
        <div class="movie-rating">⭐ ${movie.rating}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

let debounceTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => loadMovies(e.target.value), 250);
});

loadStats();
loadMovies();
