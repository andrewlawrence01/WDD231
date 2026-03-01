export async function getMovies() {
  try {
    const response = await fetch("data/movies.json");
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}