"use client";
import { Movie } from "@/Types/ComponentTypes";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Viewers from "@/components/Viewers";
import useHomePageMovies from "@/hooks/useHomePageMovies";
import { getMovieCards } from "@/lib/htmlSnippets";
import { getUseQueriesResponses } from "@/lib/utils";
import { Suspense } from "react";
import CarouselBanner from "../CarouselBanner";
import ErrorComponent from "../ErrorComponent";
import LoadingSpinner from "../LoadingSpinner";

export default function HomeComponent() {
  const results = useHomePageMovies();
  const { isLoading, error } = getUseQueriesResponses(results);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const upcomingMovies = results[0].data as Movie[];
  const topRatedMovies = results[1].data as Movie[];
  const popularMovies = results[2].data as Movie[];
  const discoverMovies = results[3].data as Movie[];

  return (
    <>
      {error.length > 0 ? (
        <ErrorComponent errorMsg={error} />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <CarouselBanner movies={discoverMovies} />
          <Viewers />
          <div className="flex flex-col space-y-2 ">
            <HorizontalCarousel
              CarouselCard={getMovieCards(upcomingMovies)}
              title="Upcoming"
            />
            <HorizontalCarousel
              CarouselCard={getMovieCards(topRatedMovies)}
              title="Top Rated"
            />
            <HorizontalCarousel
              CarouselCard={getMovieCards(popularMovies)}
              title="Popular"
            />
          </div>
        </Suspense>
      )}
    </>
  );
}
