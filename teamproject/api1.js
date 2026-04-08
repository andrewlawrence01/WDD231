const movieContainer = document.getElementById("movieContainer");
const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");

let allMovies = [];

async function loadMovies() {
  try {
    const response = await fetch("./data/movies.json");

    if (!response.ok) {
      throw new Error("Could not load movies.json");
    }

    const movies = await response.json();
    allMovies = movies;

    populateGenres(movies);
    filterAndSortMovies();
  } catch (error) {
    movieContainer.innerHTML =
      `<p class="empty-message">Failed to load movies.</p>`;
    console.error(error);
  }
}

function populateGenres(movies) {
  const genres = [...new Set(movies.map(m => m.genre))].sort();

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function displayMovies(movies) {

  movieContainer.innerHTML = "";

  if (movies.length === 0) {
    movieContainer.innerHTML =
      `<p class="empty-message">No movies found.</p>`;
    return;
  }

  movies.forEach(movie => {

    const hasPoster =
      movie.poster && movie.poster.trim() !== "";

    const posterHTML = hasPoster
      ? `<img src="${movie.poster}" class="movie-poster" alt="${movie.title}">`
      : `<div class="no-poster">${movie.title}</div>`;

    const card = document.createElement("article");

    card.classList.add("movie-card");

    card.innerHTML = `

      <div class="poster-container">
        ${posterHTML}
      </div>

      <div class="movie-info">
        <h2>${movie.title}</h2>
        <span class="genre">${movie.genre}</span>
        <p>${movie.description}</p>
      </div>

    `;

    movieContainer.appendChild(card);

  });
}

function filterAndSortMovies() {

  let movies = [...allMovies];

  const selectedGenre = genreFilter.value;
  const selectedSort = sortFilter.value;
  const searchText = searchInput.value
    .toLowerCase()
    .trim();

  if (selectedGenre !== "All") {
    movies = movies.filter(
      m => m.genre === selectedGenre
    );
  }

  if (searchText !== "") {
    movies = movies.filter(
      m => m.title.toLowerCase().includes(searchText)
    );
  }

  if (selectedSort === "az") {
    movies.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (selectedSort === "za") {
    movies.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  displayMovies(movies);
}

genreFilter.addEventListener(
  "change",
  filterAndSortMovies
);

sortFilter.addEventListener(
  "change",
  filterAndSortMovies
);

searchInput.addEventListener(
  "input",
  filterAndSortMovies
);

loadMovies();