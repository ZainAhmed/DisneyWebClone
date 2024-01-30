import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselBanner from "./CarouselBanner";

type PropsType = {
  id?: string;
  keywords?: string;
};
async function CarouselBannerWrapper({ id, keywords }: PropsType) {
  const movies = await getDiscoverMovies();
  return <CarouselBanner movies={movies} />;
}

export default CarouselBannerWrapper;
