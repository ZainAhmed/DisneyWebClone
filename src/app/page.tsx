import HomeComponent from "@/components/HomeComponent/HomeComponent";
import {
  getDiscoverMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["upComingMovies"],
    queryFn: getUpComingMovies,
  });
  await queryClient.prefetchQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
  });
  await queryClient.prefetchQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });
  await queryClient.prefetchQuery({
    queryKey: ["discoverMovies"],
    queryFn: getDiscoverMovies,
  });

  return (
    <main className="">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeComponent />
      </HydrationBoundary>
    </main>
  );
}
