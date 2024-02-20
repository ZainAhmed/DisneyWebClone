import { Movie, TvShow } from "@/Types/ComponentTypes";
import { isTvShow } from "@/lib/utils";
import MovieCard from "./MovieCard";

type PropsType = {
  movies: Movie[] | TvShow[];
  title?: string;
  videoType: string;
};
function VerticalCarousel({ movies, title, videoType }: PropsType) {
  return (
    <div className="z-10">
      <div className="flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide flex-col space-x-0 space-y-12">
        <h2 className="text-xl font-bold px-10 py-2">{title}</h2>

        {movies.map((movie) => {
          return (
            (movie.backdrop_path || movie.poster_path) && (
              <div
                key={movie.id}
                className="flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
              >
                <MovieCard key={movie.id} video={movie} videoType={videoType} />
                <div className="max-w-2xl">
                  <p className="font-bold">
                    {isTvShow(movie) ? `${movie.name} ` : `${movie.title} `}(
                    {movie.release_date?.split("-")[0] ||
                      movie.first_air_date?.split("-")[0]}
                    )
                  </p>
                  <hr className="mb-3" />
                  <p>{movie.overview}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default VerticalCarousel;
