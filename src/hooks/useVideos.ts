"use client";
import { getDiscoverMovies, getSearchedMovies, getSeries } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useVideos = (input: string) => {
  const originals = useSuspenseQuery({
    queryKey: ["Disney"],
    queryFn: async () =>
      input === "originals" && (await getSearchedMovies("disney")),
  });
  const movies = useSuspenseQuery({
    queryKey: ["Discover"],
    queryFn: async () => input === "movies" && (await getDiscoverMovies()),
  });
  const series = useSuspenseQuery({
    queryKey: ["Series"],
    queryFn: async () => input === "series" && (await getSeries()),
  });
  switch (input) {
    case "originals":
      return originals;
      break;
    case "movies":
      return movies;
      break;
    case "series":
      return series;
      break;
  }
};
export default useVideos;
