import { getGenres } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
import GenreDropdownComponent from "./GenreDropdownComponent";

async function GenreDropDown() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getGenres"],
    queryFn: getGenres,
  });
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GenreDropdownComponent />
      </HydrationBoundary>
    </Suspense>
  );
}

export default GenreDropDown;
