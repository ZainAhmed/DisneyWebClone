import {
  Genres,
  MovieDetails,
  SearchResults,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";

function getUrl(input: string) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api${input}`;
  } else {
    // Handle server-side case
    return `${process.env.PUBLIC_DOMAIN}/api${input}`;
  }
}

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
  const url = getUrl(`/movies/upcoming`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getTopRatedMovies() {
  const url = getUrl(`/movies/top_rated`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getPopularMovies() {
  const url = getUrl(`/movies/popular`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getDiscoverMovies() {
  const url = getUrl(`/movies/discover`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getDiscoverbyGeneres(id?: string) {
  const url = getUrl(`/movies/genre/${id}`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getSearchedMovies(term: string) {
  const url = getUrl(`/movies/search/${term}`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getSeries() {
  const url = getUrl(`/tv/discover`);
  const res = await fetch(url);
  return getVideoListResults(res);
}

export async function getMovieDetails(id: string) {
  const url = getUrl(`/movies/details/${id}`);
  const res = await fetch(url);
  return getVideoDetail(res);
}

export async function getTvShowDetails(id: string) {
  const url = getUrl(`/tv/details/${id}`);
  const res = await fetch(url);
  return getVideoDetail(res);
}

export async function getMovieImages(id: string) {
  const url = getUrl(`/movies/Images/${id}`);
  const res = await fetch(url);
  return getVideoImageDetail(res);
}

export async function getTvImages(id: string) {
  const url = getUrl(`/tv/Images/${id}`);
  const res = await fetch(url);
  return getVideoImageDetail(res);
}

export async function getGenres() {
  const url = getUrl(`/genres`);
  const res = await fetch(url);
  const response = (await res.json()) as Genres;
  return response;
}
