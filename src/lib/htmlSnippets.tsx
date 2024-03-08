import { Movie, TvShow } from "@/Types/ComponentTypes";
import React from "react";
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});
export const getMovieCards = (input: Movie[] | TvShow[]) => {
  return input.map((movie, index) => (
    <MovieCard key={index} video={movie} videoType="movie" />
  ));
};
