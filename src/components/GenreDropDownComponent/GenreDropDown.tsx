import { getGenres } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import GenreDropdownComponent from "./GenreDropdownComponent";

async function GenreDropDown() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getGenres"],
    queryFn: getGenres,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GenreDropdownComponent />
    </HydrationBoundary>
  );
}

export default GenreDropDown;
