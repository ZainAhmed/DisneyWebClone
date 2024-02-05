"use client";
import { Movie } from "@/Types/ComponentTypes";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import MovieCard from "./MovieCard";

type PropType = {
  movies: Movie[];
  title?: string;
};

const HorizontalCarousel: React.FC<PropType> = (props) => {
  const { movies, title } = props;
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: "trimSnaps",
  };
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="z-10 overflow-hidden">
      <h4 className=" font-bold px-10 py-2">{title}</h4>
      <div>
        <div ref={emblaRef}>
          <div className="flex space-x-4 px-5 lg:px-10 py-5 ">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarousel;
