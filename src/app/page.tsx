import { Movie, TvShow } from "@/Types/ComponentTypes";
import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Viewers from "@/components/Viewers";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/api";
import React, { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});
export const getMovieCards = (input: Movie[] | TvShow[]) => {
  return input.map((movie, index) => (
    <Suspense
      fallback={
        <ClipLoader
          color="36d7b7"
          loading={true}
          // cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
      key={index}
    >
      <MovieCard video={movie} videoType="movie" />
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
        <Suspense
          fallback={
            <ClipLoader
              color="36d7b7"
              loading={true}
              // cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        >
          <HorizontalCarousel
            CarouselCard={getMovieCards(popularMovies)}
            title="Popular"
          />
        </Suspense>
      </div>
    </main>
  );
}
