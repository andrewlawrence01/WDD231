export function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <h3>${movie.title}</h3>
      <p>${movie.genre}</p>
      <a href="details.html?id=${movie.id}">View Details</a>
    </div>
  `;
}