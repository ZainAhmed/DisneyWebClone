"use client";
import { Movie } from "@/Types/ComponentTypes";
import getImagePath from "@/lib/getImagePath";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type PropsType = {
  movies: Movie[];
};

Autoplay.globalOptions = { delay: 8000 };

function CarouselBanner({ movies }: PropsType) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);
  return (
    <div
      className="overflow-hidden relative cursor-pointer min-lg:mt-[60px] py-2 xl:h-[400px]"
      ref={emblaRef}
    >
      <div className="flex">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="flex-[0_0_95%] min-w-0 relative hover:border-4 border-white"
          >
            <Image
              src={getImagePath(movie.backdrop_path, true)}
              alt=""
              width={1920}
              height={1080}
              key={movie.id}
            />
            <div
              className="hidden lg:inline absolute mt-0 top-0 pt-40 
            xl:pt-52 left-0 lg: bg-transparent z-20 h-full 
            w-full bg-gradient-to-r from-gray-900/90 via-transparent 
            to-transparent p-10 space-y-5 text-white"
            >
              <h2 className="text-5xl font-bold max-w-xl z-50">
                {movie.title}
              </h2>
              <p className="max-w-xl line-clamp-3 ">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0 bg-grdient-to-b from-gray-200/0
       via-gray-900/25 to-gray-300 dark:to-[#1A1C29]"
      />
    </div>
  );
}

export default CarouselBanner;
