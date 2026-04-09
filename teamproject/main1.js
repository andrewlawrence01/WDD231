import { createMovieCard } from "./ui.js";

const container = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");

let movies = [];

async function loadMovies() {
  try {
    const response = await fetch("./data/movies.json");

    if (!response.ok) {
      throw new Error("Failed to load movies");
    }

    movies = await response.json();

    populateGenres(movies);
    renderMovies(movies);

  } catch (error) {
    container.innerHTML =
      `<p class="empty-message">Failed to load movies.</p>`;
    console.error(error);
  }
}

function renderMovies(movieList) {

  // ✅ FIX: show message if empty
  if (movieList.length === 0) {
    const searchValue = searchInput.value.trim();

    container.innerHTML = `
      <p class="empty-message">
        ${searchValue
          ? `No results found for "${searchValue}"`
          : "No movies found."}
      </p>
    `;
    return;
  }

  container.innerHTML = movieList
    .map(movie => createMovieCard(movie))
    .join("");
}

function populateGenres(movieList) {
  const genres = [...new Set(movieList.map(movie => movie.genre))].sort();

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function filterMovies() {
  let filtered = [...movies];

  const searchText = searchInput.value.toLowerCase().trim();
  const genre = genreFilter.value;
  const sort = sortFilter.value;

  // Search
  if (searchText !== "") {
    filtered = filtered.filter(movie =>
      movie.title.toLowerCase().includes(searchText)
    );
  }

  // Genre
  if (genre !== "All") {
    filtered = filtered.filter(movie =>
      movie.genre === genre
    );
  }

  // Sort
  if (sort === "az") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "za") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  renderMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
sortFilter.addEventListener("change", filterMovies);

loadMovies();