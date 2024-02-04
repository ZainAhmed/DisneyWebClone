import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const upcomingMovies = await getUpComingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-60">
        <HorizontalCarousel movies={upcomingMovies} title="Upcoming" />
        <HorizontalCarousel movies={topRatedMovies} title="Top Rated" />
        <HorizontalCarousel movies={popularMovies} title="Popular" />
      </div>
    </main>
  );
}
