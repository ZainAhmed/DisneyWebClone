import { Movie, TvShow } from "@/Types/ComponentTypes";
import MovieCard from "@/components/MovieCard";

export const getMovieCards = (input: Movie[] | TvShow[]) => {
  return input.map((movie, index) => (
    <MovieCard key={index} video={movie} videoType="movie" />
  ));
};
