import VerticalCarousel from "@/components/VerticalCarousel";
import { getDiscoverbyGeneres } from "@/lib/api";

type PropsType = {
  params: {
    id?: string;
  };
  searchParams: {
    genre?: string;
  };
};
async function GenrePage({ params, searchParams }: PropsType) {
  const { id } = params;
  const { genre } = searchParams;

  const movies = await getDiscoverbyGeneres(id);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {genre}</h1>
        <VerticalCarousel title="Genre" movies={movies} videoType="movie" />
      </div>
    </div>
  );
}

export default GenrePage;
