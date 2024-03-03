import {
  getDiscoverMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const homePageEndpoints = [
  { key: ["upComingMovies"], func: getUpComingMovies },
  { key: ["topRatedMovies"], func: getTopRatedMovies },
  { key: ["popularMovies"], func: getPopularMovies },
  { key: ["discoverMovies"], func: getDiscoverMovies },
];

const useHomePageMovies = () => {
  return useSuspenseQueries({
    queries: homePageEndpoints.map((data) => ({
      queryKey: data.key,
      queryFn: async () => await data.func(),
    })),
  });
};
export default useHomePageMovies;
