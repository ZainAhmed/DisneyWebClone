import { Movie, TvShow } from "@/Types/ComponentTypes";
import { UseSuspenseQueryResult } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseURL = "https://api.themoviedb.org/3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTvShow(movie: Movie | TvShow): movie is TvShow {
  return (movie as TvShow).name !== undefined;
}
export function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
export const setSearchParam = (url: URL) => {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");
  url.searchParams.set("sort_by", "popularity.desc");
  return url;
};

export const getHeaders = () => {
  const options: RequestInit = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 6 * 24, //24 hours
    },
  };
  return options;
};
export async function fetchFromTMDB(url: URL, isSearchParams: boolean) {
  const options: RequestInit = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 6 * 24, //24 hours
    },
  };
  if (isSearchParams) {
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("include_video", "false");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");
    url.searchParams.set("sort_by", "popularity.desc");
  }
  const data = await fetch(url, options);
  return await data.json();
}

export const getUseQueriesResponses = (
  results: UseSuspenseQueryResult<any>[]
) => {
  let isLoading = false;
  let error = "";
  results.forEach((res) => {
    if (res.isLoading) {
      isLoading = true;
    }
    if (res.error) {
      error += res.error + ". ";
    }
  });
  return { isLoading: isLoading, error: error };
};
