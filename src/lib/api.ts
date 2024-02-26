import {
  MovieDetails,
  SearchResults,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";

const apiBaseUrl = "http://localhost:3000/apis";

async function getVideoListResults(response: Response) {
  const data = (await response.json()) as SearchResults;
  return data.results;
}

async function getVideoImageDetail(response: Response) {
  return (await response.json()) as VideoImages;
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
  return (await res.json()) as MovieDetails;
}

export async function getTvShowDetails(id: string) {
  const res = await fetch(`${apiBaseUrl}/tv/details/${id}`);
  return (await res.json()) as TvShowDetails;
}

export async function getMovieImages(id: string) {
  const res = await fetch(`${apiBaseUrl}/movies/Images/${id}`);
  return getVideoImageDetail(res);
}

export async function getTvImages(id: string) {
  const res = await fetch(`${apiBaseUrl}/tv/Images/${id}`);
  return getVideoImageDetail(res);
}
