import VideoTypeComponent from "@/components/VideoTypeComponent/VideoTypeComponent";
import { getDiscoverMovies, getSearchedMovies, getSeries } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
        queryFn: async () => await getSearchedMovies("disney"),
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
        queryFn: () => getSeries(),
      });
      videoType = "tv";
      break;
    default:
      break;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoTypeComponent videoType={videoType} types={types} />
    </HydrationBoundary>
  );
}

export default TypePage;
