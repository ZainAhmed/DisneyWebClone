import { getPopularMovies, getSearchedMovies } from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const useSearch = (termToUse: string) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ["searchMovies", termToUse],
        queryFn: async () => await getSearchedMovies(termToUse),
      },
      {
        queryKey: ["popularMovies"],
        queryFn: async () => await getPopularMovies(),
      },
    ],
  });
};

export default useSearch;
