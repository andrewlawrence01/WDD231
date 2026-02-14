export async function getMovies() {
  const response = await fetch("../data/movies.json");
  return await response.json();
}