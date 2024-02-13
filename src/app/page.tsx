import { Movie } from "@/Types/ComponentTypes";
import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Viewers from "@/components/Viewers";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/getMovies";
import React, { Suspense } from "react";
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});
export const getMovieCards = (input: Movie[]) => {
  return input.map((movie, index) => (
    <Suspense fallback={"Loading..."} key={index}>
      <MovieCard movie={movie} />
    </Suspense>
  ));
};
export default async function Home() {
  const upcomingMovies = await getUpComingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="">
      <CarouselBannerWrapper />
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
    </main>
  );
}
