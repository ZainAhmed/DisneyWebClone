import VerticalCarousel from "@/components/VerticalCarousel";
import {
  getDiscoverMovies,
  getSearchedMovies,
  getSeries,
} from "@/lib/getMovies";
import { capitalizeFirstLetter } from "@/lib/utils";

type PageProps = {
  params: {
    types: string;
  };
};

async function TypePage({ params }: PageProps) {
  const { types } = params;
  let movies;
  switch (types) {
    case "originals":
      movies = await getSearchedMovies("disney");
      break;
    case "movies":
      movies = await getDiscoverMovies();
      break;
    case "series":
      movies = await getSeries();
      break;
    default:
      break;
  }
  return movies ? (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">
          {capitalizeFirstLetter(types)}
        </h1>
        <VerticalCarousel movies={movies} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default TypePage;
