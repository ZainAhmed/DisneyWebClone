import { Movie } from "@/Types/ComponentTypes";
import { cn } from "@/lib/utils";
import MovieCard from "./MovieCard";

type PropsType = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

function MoviesCarousel({ title, movies, isVertical }: PropsType) {
  return (
    <div className="z-50">
      <h2>{title}</h2>
      <div
        className={cn(
          "flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide",
          isVertical && "flex-col space-x-0 space-y-12"
        )}
      >
        {movies?.map((movie) =>
          isVertical ? (
            <div
              key={movie.id}
              className={cn(
                isVertical &&
                  "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
              )}
            >
              <MovieCard key={movie.id} movie={movie} />
              <div className="max-w-2xl">
                <p className="font-bold">
                  {movie.title}({movie.release_date.split("-")[0]})
                </p>
                <hr className="mb-3" />
                <p>{movie.overview}</p>
              </div>
            </div>
          ) : (
            <MovieCard key={movie.id} movie={movie} />
          )
        )}
      </div>
    </div>
  );
}

export default MoviesCarousel;
