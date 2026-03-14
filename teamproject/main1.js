import { createMovieCard } from "./ui.js";

const container = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");

let movies = [];

async function loadMovies() {

const response = await fetch("./data/movies.json");
movies = await response.json();

populateGenres(movies);
renderMovies(movies);

}

function renderMovies(movieList){

container.innerHTML = movieList
.map(movie => createMovieCard(movie))
.join("");

}

function populateGenres(movieList){

const genres = [...new Set(movieList.map(movie => movie.genre))];

genres.forEach(genre => {

const option = document.createElement("option");
option.value = genre;
option.textContent = genre;

genreFilter.appendChild(option);

});

}

function filterMovies(){

let filtered = [...movies];

const searchText = searchInput.value.toLowerCase();
const genre = genreFilter.value;
const sort = sortFilter.value;

if(searchText){

filtered = filtered.filter(movie =>
movie.title.toLowerCase().includes(searchText)
);

}

if(genre !== "All"){

filtered = filtered.filter(movie =>
movie.genre === genre
);

}

if(sort === "az"){

filtered.sort((a,b)=>a.title.localeCompare(b.title));

}

if(sort === "za"){

filtered.sort((a,b)=>b.title.localeCompare(a.title));

}

renderMovies(filtered);

}

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
sortFilter.addEventListener("change", filterMovies);

loadMovies();