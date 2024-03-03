import GenreComponent from "@/components/GenreComponent/GenreComponent";
import { getDiscoverbyGeneres } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GenreComponent id={id} genre={genre} />
    </HydrationBoundary>
  );
}

export default GenrePage;
