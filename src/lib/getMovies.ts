import { SearchResults } from "@/Types/ComponentTypes";
const baseURL = "https://api.themoviedb.org/3";
const moviesURL = `${baseURL}/movie`;

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  url.searchParams.set("sort_by", "popularity.desc");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 6 * 24, //24 hours
    },
  };
  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;
  return data.results;
}

export async function getUpComingMovies() {
  const url = new URL(`${moviesURL}/upcoming`);
  return await fetchFromTMDB(url);
}

export async function getTopRatedMovies() {
  const url = new URL(`${moviesURL}/top_rated`);
  return await fetchFromTMDB(url);
}

export async function getPopularMovies() {
  const url = new URL(`${moviesURL}/popular`);
  return await fetchFromTMDB(url);
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`${baseURL}/discover/movie`);

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);
  return await fetchFromTMDB(url);
}

export async function getSearchedMovies(term: string) {
  const url = new URL(`${baseURL}/search/movie`);
  url.searchParams.set("query", term);
  return await fetchFromTMDB(url);
}
