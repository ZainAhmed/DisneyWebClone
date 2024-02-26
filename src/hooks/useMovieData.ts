import { getMovieDetails, getMovieImages } from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const movieEndpoints = (id: string) => {
  return [
    { key: ["getMovieDetails", id], func: getMovieDetails },
    { key: ["getMovieImages", id], func: getMovieImages },
  ];
};

const useMovieData = (id: string, videoType: string) => {
  return useSuspenseQueries({
    queries: movieEndpoints(id).map((movieData) => {
      return {
        queryKey: movieData.key,
        queryFn: async () => await movieData.func(id),
        enabled: videoType == "tv",
      };
    }),
  });
};

export default useMovieData;
