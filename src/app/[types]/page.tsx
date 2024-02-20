import VerticalCarousel from "@/components/VerticalCarousel";
import { getDiscoverMovies, getSearchedMovies, getSeries } from "@/lib/api";
import { capitalizeFirstLetter } from "@/lib/utils";

type PageProps = {
  params: {
    types: string;
  };
};

async function TypePage({ params }: PageProps) {
  const { types } = params;
  let movies;
  let videoType;
  switch (types) {
    case "originals":
      movies = await getSearchedMovies("disney");
      videoType = "movie";
      break;
    case "movies":
      movies = await getDiscoverMovies();
      videoType = "movie";
      break;
    case "series":
      movies = await getSeries();
      videoType = "tv";
      break;
    default:
      break;
  }
  return movies && videoType ? (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">
          {capitalizeFirstLetter(types)}
        </h1>
        <VerticalCarousel movies={movies} videoType={videoType} />
      </div>
    </div>
  ) : (
    <></>
  );
}

export default TypePage;
