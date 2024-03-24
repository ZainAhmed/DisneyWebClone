import HomeComponent from "@/components/HomeComponent/HomeComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
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
import { Suspense } from "react";

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
    queryFn: () => getDiscoverMovies(),
  });

  return (
    <main className="">
      <Suspense fallback={<LoadingSpinner />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeComponent />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}
