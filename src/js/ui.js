export function createMovieCard(movie) {
  return `
    <div class="movie-card">
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