import LoadingSpinner from "@/components/LoadingSpinner";
import VideoTypeComponent from "@/components/VideoTypeComponent/VideoTypeComponent";
import { getDiscoverMovies, getSearchedMovies, getSeries } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";

type PageProps = {
  params: {
    types: string;
  };
};

async function TypePage({ params }: PageProps) {
  const { types } = params;

  const queryClient = new QueryClient();

  let videoType;

  switch (types) {
    case "originals":
      await queryClient.prefetchQuery({
        queryKey: ["searchMovies", "Disney"],
        queryFn: () => getSearchedMovies("disney"),
      });
      videoType = "movie";
      break;
    case "movies":
      await queryClient.prefetchQuery({
        queryKey: ["discoverMovies"],
        queryFn: () => getDiscoverMovies(),
      });
      videoType = "movie";
      break;
    case "series":
      await queryClient.prefetchQuery({
        queryKey: ["Series"],
        queryFn: getSeries,
      });
      videoType = "tv";
      break;
    default:
      break;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VideoTypeComponent videoType={videoType} types={types} />
      </HydrationBoundary>
    </Suspense>
  );
}

export default TypePage;
