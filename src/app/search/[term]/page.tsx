import { Movie, TvShow } from "@/Types/ComponentTypes";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import VerticalCarousel from "@/components/VerticalCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/api";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
type PropsType = {
  params: {
    term: string;
  };
};
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});
export const getMovieCards = (input: Movie[] | TvShow[]) => {
  return input.map((movie, index) => (
    <Suspense fallback={"Loading..."} key={index}>
      <MovieCard video={movie} videoType="movie" />
    </Suspense>
  ));
};

async function SearchPage({ params }: PropsType) {
  const { term } = params;

  if (!term) notFound();

  const termToUse = decodeURI(term);
  const movies = await getSearchedMovies(termToUse);
  const popularMovies = await getPopularMovies();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
        <VerticalCarousel title="Movies" movies={movies} videoType="movie" />
        <HorizontalCarousel
          title="You may also like"
          CarouselCard={getMovieCards(popularMovies)}
        />
      </div>
    </div>
  );
}

export default SearchPage;
