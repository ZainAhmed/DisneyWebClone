import GenreComponent from "@/components/GenreComponent/GenreComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getDiscoverbyGeneres } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";

type PropsType = {
  params: {
    id?: string;
  };
  searchParams: {
    genre?: string;
  };
};
async function GenrePage({ params, searchParams }: PropsType) {
  const { id } = params;
  const { genre } = searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["genre", params.id],
    queryFn: () => getDiscoverbyGeneres(id),
  });
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GenreComponent id={id} genre={genre} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default GenrePage;
