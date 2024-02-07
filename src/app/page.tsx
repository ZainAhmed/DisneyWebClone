import { Movie } from "@/Types/ComponentTypes";
import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import MovieCard from "@/components/MovieCard";
import Viewers from "@/components/Viewers";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/getMovies";
export const getMovieCards = (input: Movie[]) => {
  return input.map((movie, index) => <MovieCard movie={movie} key={index} />);
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
