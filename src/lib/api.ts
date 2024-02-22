import {
  MovieDetails,
  SearchResults,
  TvShowDetails,
} from "@/Types/ComponentTypes";

const baseURL = "https://api.themoviedb.org/3";
const moviesURL = `${baseURL}/movie`;

const apiBaseUrl = "http://localhost:3000/apis";

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
  const res = await fetch(`${apiBaseUrl}/movies/upcoming`);
  return getVideoListResults(res);
}

export async function getTopRatedMovies() {
  const res = await fetch(`${apiBaseUrl}/movies/top_rated`);
  return getVideoListResults(res);
}

export async function getPopularMovies() {
  const res = await fetch(`${apiBaseUrl}/movies/popular`);
  return getVideoListResults(res);
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const res = await fetch(`${apiBaseUrl}/movies/discover`);
  return getVideoListResults(res);
}

export async function getSearchedMovies(term: string) {
  const res = await fetch(`${apiBaseUrl}/movies/search/${term}`);
  return getVideoListResults(res);
}

export async function getSeries() {
  const res = await fetch(`${apiBaseUrl}/tv/discover`);
  return getVideoListResults(res);
}

export async function getMovieDetails(id: string) {
  const res = await fetch(`${apiBaseUrl}/movies/details/${id}`);
  return getVideoDetail(res);
}

export async function getTvShowDetails(id: string) {
  const res = await fetch(`${apiBaseUrl}/tv/details/${id}`);
  return getVideoDetail(res);
}

// export async function getMovieImages(id: string) {
//   const url = new URL(`${baseURL}/movie/${id}/images`);
//   const reponse = await fetchFromTMDB(url);
// }
