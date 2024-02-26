import VideoDetailsComponent from "@/components/VideoDetails/VideoDetailsComponent";
import {
  getMovieDetails,
  getMovieImages,
  getTvImages,
  getTvShowDetails,
} from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

type PageProps = {
  params: {
    videoType: string;
    id: string;
  };
};
async function DetailsPage({ params }: PageProps) {
  const { videoType, id } = params;

  const queryClient = new QueryClient();
  switch (videoType) {
    case "tv":
      await queryClient.prefetchQuery({
        queryKey: ["getTvShowDetails", id],
        queryFn: () => getTvShowDetails(id),
      });
      await queryClient.prefetchQuery({
        queryKey: ["getTvImages", id],
        queryFn: () => getTvImages(id),
      });
      break;
    case "movie":
      await queryClient.prefetchQuery({
        queryKey: ["getMovieDetails", id],
        queryFn: () => getMovieDetails(id),
      });
      await queryClient.prefetchQuery({
        queryKey: ["getMovieImages", id],
        queryFn: () => getMovieImages(id),
      });
      break;
    default:
      break;
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoDetailsComponent id={id} videoType={videoType} />
    </HydrationBoundary>
  );
}

export default DetailsPage;
