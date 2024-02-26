"use client";
import {
  MovieDetails,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import useMovieData from "@/hooks/useMovieData";
import useTvData from "@/hooks/useTvData";
import getImagePath from "@/lib/getImagePath";
import Image from "next/image";
import { Suspense } from "react";

type PageProps = {
  videoType: string;
  id: string;
};
function VideoDetailsComponent({ videoType, id }: PageProps) {
  const movieData = useMovieData(id, videoType);
  const tvData = useTvData(id, videoType);

  const tvDetail = tvData[0]?.data as TvShowDetails;
  const tvImages = tvData[1]?.data as VideoImages;
  const movieDetail = movieData[0]?.data as MovieDetails;
  const movieImages = movieData[1]?.data as VideoImages;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="relative min-h-[calc(100vh-250px)] overflow-x-hidden block top-[72px] py-0 px-[calc(3.5vw + 5px)]">
        <div className="fixed left-0 right-0 top-0 opacity-80 z-[-1]">
          <Image
            src={getImagePath(
              tvDetail.backdrop_path ||
                tvDetail.poster_path ||
                movieDetail.backdrop_path ||
                movieDetail.poster_path
            )}
            alt=""
            fill={true}
            className="!relative"
            style={{ marginTop: "100px" }}
          />
        </div>

        <div className="flex w-full items-end justify-start my-0 mx-auto h-[30vw] min-h-[170px] pb-[24px]"></div>
      </div>
    </Suspense>
  );
}

export default VideoDetailsComponent;
