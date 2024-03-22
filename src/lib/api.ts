import {
  Genres,
  MovieDetails,
  SearchResults,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";

const apiBaseUrl = `${process.env.PUBLIC_DOMAIN}/apis`;

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

async function getVideoListResults(response: Response) {
  const data = (await handleResponse(response)) as SearchResults;
  return data.results;
}

async function getVideoDetail(response: Response) {
  return (await handleResponse(response)) as TvShowDetails | MovieDetails;
}

async function getVideoImageDetail(response: Response) {
  return (await handleResponse(response)) as VideoImages;
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

export async function getDiscoverMovies() {
  const res = await fetch(`${apiBaseUrl}/movies/discover`);
  return getVideoListResults(res);
}

export async function getDiscoverbyGeneres(id?: string) {
  const res = await fetch(`${apiBaseUrl}/movies/genre/${id}`);
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

export async function getMovieImages(id: string) {
  const res = await fetch(`${apiBaseUrl}/movies/Images/${id}`);
  return getVideoImageDetail(res);
}

export async function getTvImages(id: string) {
  const res = await fetch(`${apiBaseUrl}/tv/Images/${id}`);
  return getVideoImageDetail(res);
}

export async function getGenres() {
  const res = await fetch(`${apiBaseUrl}/genres`);
  const response = (await res.json()) as Genres;
  return response;
}
