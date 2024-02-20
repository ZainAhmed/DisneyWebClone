import {
  MovieDetails,
  SearchResults,
  TvShowDetails,
} from "@/Types/ComponentTypes";
const baseURL = "https://api.themoviedb.org/3";
const moviesURL = `${baseURL}/movie`;

async function fetchFromTMDB(url: URL) {
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
      revalidate: 60 * 6 * 24, //24 hours
    },
  };
  return await fetch(url.toString(), options);
}
async function getVideoListResults(response: Response) {
  const data = (await response.json()) as SearchResults;
  return data.results;
}

async function getVideoDetail(response: Response) {
  return (await response.json()) as TvShowDetails | MovieDetails;
}

export async function getUpComingMovies() {
  const url = new URL(`${moviesURL}/upcoming`);
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getTopRatedMovies() {
  const url = new URL(`${moviesURL}/top_rated`);
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getPopularMovies() {
  const url = new URL(`${moviesURL}/popular`);
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`${baseURL}/discover/movie`);
  if (id !== "discover") {
    keywords && url.searchParams.set("with_keywords", keywords);
    id && url.searchParams.set("with_genres", id);
  }
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getSearchedMovies(term: string) {
  const url = new URL(`${baseURL}/search/movie`);
  url.searchParams.set("query", term);
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getSeries() {
  const url = new URL(`${baseURL}/discover/tv`);
  const reponse = await fetchFromTMDB(url);
  return getVideoListResults(reponse);
}

export async function getMovieDetails(id: string) {
  const url = new URL(`${baseURL}/movie/${id}`);
  const reponse = await fetchFromTMDB(url);
  return getVideoDetail(reponse);
}

export async function getTvShowDetails(id: string) {
  const url = new URL(`${baseURL}/tv/${id}`);

  const reponse = await fetchFromTMDB(url);
  return getVideoDetail(reponse);
}

export async function getMovieImages(id: string) {
  const url = new URL(`${baseURL}/movie/${id}/images`);
  const reponse = await fetchFromTMDB(url);
}
