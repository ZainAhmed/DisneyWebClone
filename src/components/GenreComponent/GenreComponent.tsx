"use client";
import VerticalCarousel from "@/components/VerticalCarousel";
import { getDiscoverbyGeneres } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import ErrorComponent from "../ErrorComponent";
import LoadingSpinner from "../LoadingSpinner";

type PropsType = {
  id?: string;
  genre?: string;
};
function GenreComponent({ id, genre }: PropsType) {
  const {
    data: movies,
    error,
    isLoading,
  } = useSuspenseQuery({
    queryKey: ["genre", id],
    queryFn: async () => await getDiscoverbyGeneres(),
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {!error ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
            <h1 className="text-6xl font-bold px-10">Results for {genre}</h1>
            <VerticalCarousel title="Genre" movies={movies} videoType="movie" />
          </div>
        </div>
      ) : (
        <ErrorComponent errorMsg={error.message} />
      )}
    </Suspense>
  );
}

export default GenreComponent;
