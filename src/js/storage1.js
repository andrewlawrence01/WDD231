export function saveReview(movieId, review) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
  if (!reviews[movieId]) reviews[movieId] = [];
  reviews[movieId].push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}