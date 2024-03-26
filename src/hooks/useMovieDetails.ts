import { getMovieDetails, getMovieImages } from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const movieEndpoints = (id: string, videoType: string) => {
  if (videoType !== "movie") return [];
  return [
    { key: ["getMovieDetails", id], func: getMovieDetails },
    { key: ["getMovieImages", id], func: getMovieImages },
  ];
};

const useMovieDetails = (id: string, videoType: string) => {
  return useSuspenseQueries({
    queries: movieEndpoints(id, videoType).map((movieData) => {
      return {
        queryKey: movieData.key,
        queryFn: async () => await movieData.func(id),
      };
    }),
  });
};

export default useMovieDetails;
