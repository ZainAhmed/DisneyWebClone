"use client";
import { Movie, TvShow } from "@/Types/ComponentTypes";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Viewers from "@/components/Viewers";
import useHomePageMovies from "@/hooks/useHomePageMovies";
import React, { Suspense } from "react";
import CarouselBanner from "../CarouselBanner";
import LoadingSpinner from "../LoadingSpinner";
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});
export const getMovieCards = (input: Movie[] | TvShow[]) => {
  return input.map((movie, index) => (
    <MovieCard key={index} video={movie} videoType="movie" />
  ));
};

export default function HomeComponent() {
  const results = useHomePageMovies();
  const upcomingMovies = results[0].data;
  const topRatedMovies = results[1].data;
  const popularMovies = results[2].data;
  const discoverMovies = results[3].data as Movie[];
  return (
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
  );
}
