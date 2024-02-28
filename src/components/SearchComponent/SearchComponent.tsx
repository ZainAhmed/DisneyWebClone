"use client";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import VerticalCarousel from "@/components/VerticalCarousel";
import useSearch from "@/hooks/useSearch";
import { getMovieCards } from "@/lib/htmlSnippets";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import LoadingSpinner from "../LoadingSpinner";
const MovieCard = React.lazy(() => {
  return import("@/components/MovieCard");
});

type PropsType = {
  termToUse: string;
};

function SearchComponent({ termToUse }: PropsType) {
  if (!termToUse) notFound();

  const results = useSearch(termToUse);

  const movies = results[0].data;
  const popularMovies = results[1].data;
  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export default SearchComponent;
