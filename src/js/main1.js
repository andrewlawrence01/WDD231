import { getMovies } from "./api.js";
import { createMovieCard, renderReviews } from "./ui.js";
import { getIdFromURL } from "./utils.js";
import { saveReview, getReviews } from "./storage.js";

const moviesSection = document.getElementById("movies");
const detailsSection = document.getElementById("details");

async function loadMovies() {
  if (!moviesSection) return;

  const movies = await getMovies();
  moviesSection.innerHTML = movies.map(createMovieCard).join("");
}

async function loadDetails() {
  if (!detailsSection) return;

  const id = getIdFromURL();
  const movies = await getMovies();
  const movie = movies.find(m => m.id == id);

  if (!movie) {
    detailsSection.innerHTML = "<p>Movie not found.</p>";
    return;
  }

  detailsSection.innerHTML = `
    <h2>${movie.title}</h2>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p>${movie.description}</p>
  `;

  displayReviews(id);
}

function setupForm() {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const review = {
      name: document.getElementById("name").value,
      rating: document.getElementById("rating").value,
      text: document.getElementById("review").value
    };

    const id = getIdFromURL();
    saveReview(id, review);
    form.reset();
    displayReviews(id);
  });
}

function displayReviews(id) {
  const container = document.getElementById("reviewsContainer");
  const reviews = getReviews(id);
  container.innerHTML = renderReviews(reviews);
}

function setupGenreFilter() {
  const select = document.getElementById("genre");
  if (!select) return;

  select.addEventListener("change", async () => {
    const movies = await getMovies();
    const value = select.value;

    const filtered = value === "all"
      ? movies
      : movies.filter(movie => movie.genre === value);

    moviesSection.innerHTML = filtered.map(createMovieCard).join("");
  });
}

loadMovies();
loadDetails();
setupForm();
setupGenreFilter();