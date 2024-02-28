import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { getPopularMovies, getSearchedMovies } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
type PropsType = {
  params: {
    term: string;
  };
};
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});

async function SearchPage({ params }: PropsType) {
  const { term } = params;

  const queryClient = new QueryClient();
  const termToUse = decodeURI(term);

  await queryClient.prefetchQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => await getPopularMovies(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["searchMovies", termToUse],
    queryFn: async () => await getSearchedMovies(termToUse),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchComponent termToUse={termToUse} />
    </HydrationBoundary>
  );
}

export default SearchPage;
