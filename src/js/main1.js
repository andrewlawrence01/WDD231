import { getMovies } from "./api.js";
import { createMovieCard } from "./ui.js";
import { getIdFromURL } from "./utils.js";
import { saveReview } from "./storage.js";

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

  detailsSection.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.description}</p>
  `;
}

function setupForm() {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const review = {
      name: form.name.value,
      rating: form.rating.value,
      text: form.review.value
    };

    const id = getIdFromURL();
    saveReview(id, review);
    alert("Review saved!");
    form.reset();
  });
}

loadMovies();
loadDetails();
setupForm();