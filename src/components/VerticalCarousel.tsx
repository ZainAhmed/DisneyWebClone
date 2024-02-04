import { Movie } from "@/Types/ComponentTypes";
import MovieCard from "./MovieCard";

type PropsType = {
  movies: Movie[];
  title?: string;
};
function VerticalCarousel({ movies, title }: PropsType) {
  return (
    <div className="z-50">
      <div className="flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide flex-col space-x-0 space-y-12">
        <h2 className="text-xl font-bold px-10 py-2">{title}</h2>

        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
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
          );
        })}
      </div>
    </div>
  );
}

export default VerticalCarousel;
