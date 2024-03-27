import {
  Genres,
  MovieDetails,
  SearchResults,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";
import { handleResponse } from "./utils";

function getUrl(input: string) {
  if (typeof window !== "undefined") {
    // Client-side rendering
    return `${window.location.origin}/api${input}`;
  } else if (process.env.NEXT_PUBLIC_DOMAIN) {
    // Use environment variable for build process
    return `${process.env.NEXT_PUBLIC_DOMAIN}/api${input}`;
  } else {
    // Fallback to a default value or throw an error
    throw new Error("NEXT_PUBLIC_DOMAIN is not defined");
  }
}

async function fetchData(url: string) {
  try {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}: ${response.status} ${response.statusText}`
      );
    }
    return response;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
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
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getTopRatedMovies() {
  const url = getUrl(`/movies/top_rated`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getPopularMovies() {
  const url = getUrl(`/movies/popular`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getDiscoverMovies() {
  const url = getUrl(`/movies/discover`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getDiscoverbyGeneres(id?: string) {
  const url = getUrl(`/movies/genre/${id}`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getSearchedMovies(term: string) {
  const url = getUrl(`/movies/search/${term}`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getSeries() {
  const url = getUrl(`/tv/discover`);
  const res = await fetchData(url);
  return getVideoListResults(res);
}

export async function getMovieDetails(id: string) {
  const url = getUrl(`/movies/details/${id}`);
  const res = await fetchData(url);
  return getVideoDetail(res);
}

export async function getTvShowDetails(id: string) {
  const url = getUrl(`/tv/details/${id}`);
  const res = await fetchData(url);
  return getVideoDetail(res);
}

export async function getMovieImages(id: string) {
  const url = getUrl(`/movies/Images/${id}`);
  const res = await fetchData(url);
  return getVideoImageDetail(res);
}

export async function getTvImages(id: string) {
  const url = getUrl(`/tv/Images/${id}`);
  const res = await fetchData(url);
  return getVideoImageDetail(res);
}

export async function getGenres() {
  try {
    const url = getUrl(`/genres`);
    const res = await fetchData(url);
    const response = (await res.json()) as Genres;
    return response;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
}
