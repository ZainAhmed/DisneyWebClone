import HorizontalCarousel from "@/components/HorizontalCarousel";
import VerticalCarousel from "@/components/VerticalCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";
type PropsType = {
  params: {
    term: string;
  };
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
        <VerticalCarousel title="Movies" movies={movies} />
        <HorizontalCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
