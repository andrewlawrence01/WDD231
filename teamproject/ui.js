export function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
      <h3>${movie.title}</h3>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <a href="details.html?id=${movie.id}">
        View Details
      </a>
    </div>
  `;
}

export function renderReviews(reviews) {
  if (reviews.length === 0) {
    return "<p>No reviews yet.</p>";
  }

  return reviews.map(review => `
    <div class="review">
      <strong>${review.name}</strong> — ⭐ ${review.rating}/5
      <p>${review.text}</p>
    </div>
  `).join("");
  
}