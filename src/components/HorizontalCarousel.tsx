"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

type PropType = {
  CarouselCard: JSX.Element[];
  title?: string;
};

const HorizontalCarousel: React.FC<PropType> = (props) => {
  const { CarouselCard, title } = props;
  const options: EmblaOptionsType = {
    dragFree: true,
    containScroll: "trimSnaps",
  };

  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="z-10 overflow-hidden">
      <h4 className=" font-bold px-10 py-2 text-white">{title}</h4>
      <div>
        <div ref={emblaRef}>
          <div className="flex space-x-4 px-5 lg:px-10 py-5 ">
            {CarouselCard.map((element) => element)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarousel;
