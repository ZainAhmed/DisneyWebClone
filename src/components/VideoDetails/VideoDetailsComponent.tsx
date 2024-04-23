"use client";
import {
  ImagesDetails,
  MovieDetails,
  TvShowDetails,
  VideoImages,
} from "@/Types/ComponentTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import useMovieDetails from "@/hooks/useMovieDetails";
import useTvDetails from "@/hooks/useTvDetails";
import getImagePath from "@/lib/getImagePath";
import { getUseQueriesResponses } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import ErrorComponent from "../ErrorComponent";

type PageProps = {
  videoType: string;
  id: string;
};

const filterByLang = (input: ImagesDetails[], lang: string | null) => {
  if (input) {
    return input.filter((element) => {
      return element.iso_639_1 === lang;
    });
  }
  return [];
};

const getGenres = (input: [{ id: number; name: string }]) => {
  let output = "";
  input.forEach((element) => {
    output += element.name + ", ";
  });
  output = output.slice(0, -2);
  return output;
};

const createMovieSubtitle = (videoDetails: MovieDetails) => {
  const year = videoDetails.release_date.split("-")[0];
  const genres = getGenres(videoDetails.genres);

  const subtitle = `${year} • ${videoDetails.runtime} min • ${genres}`;
  return subtitle;
};

const createTvSubtitle = (videoDetails: TvShowDetails) => {
  const genres = getGenres(videoDetails.genres);

  const subtitle = ` ${genres}`;
  return subtitle;
};

function VideoDetailsComponent({ videoType, id }: PageProps) {
  const movieData = useMovieDetails(id, videoType);
  const tvData = useTvDetails(id, videoType);

  let logo, backdropImg, subtitle, overview;
  let errorMsg = "";
  let loadingStatus = false;
  switch (videoType) {
    case "movie":
      const { error: movieError, isLoading: movieLoadingStatus } =
        getUseQueriesResponses(movieData);
      loadingStatus = movieLoadingStatus;
      errorMsg = movieError;
      const movieDetail = movieData[0]?.data as MovieDetails;
      const movieImages = movieData[1]?.data as VideoImages;

      const movieLogoArray = filterByLang(movieImages.logos, "en");
      const movieBackdropImgArray = filterByLang(movieImages.backdrops, null);

      logo = movieLogoArray.length > 0 && movieLogoArray[0].file_path;
      backdropImg =
        movieBackdropImgArray.length > 0 && movieBackdropImgArray[0].file_path;
      subtitle = createMovieSubtitle(movieDetail);
      overview = movieDetail.overview;
      break;
    case "tv":
      const { error: tvError, isLoading: tvLoadingStatus } =
        getUseQueriesResponses(tvData);
      loadingStatus = tvLoadingStatus;
      errorMsg = tvError;
      const tvDetail = tvData[0]?.data as TvShowDetails;
      const tvImages = tvData[1]?.data as VideoImages;

      const tvLogoArray = filterByLang(tvImages.logos, "en");
      const tvBackdropArray = filterByLang(tvImages?.backdrops, null);

      logo = tvLogoArray.length > 0 && tvLogoArray[0].file_path;
      backdropImg = tvBackdropArray.length > 0 && tvBackdropArray[0].file_path;
      subtitle = createTvSubtitle(tvDetail);
      overview = tvDetail.overview;
      break;
    default:
      break;
  }
  if (loadingStatus) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {errorMsg.length > 0 ? (
        <ErrorComponent errorMsg={errorMsg} />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          {/* Container */}
          <div className="relative min-h-[calc(100vh-250px)] overflow-x-hidden block top-[72px] py-0 px-[calc(3.5vw + 5px)]">
            {/* Background */}
            <div className="fixed left-0 right-0 top-0 opacity-80 z-[-1]">
              {backdropImg && (
                <Image
                  src={getImagePath(backdropImg, true)}
                  alt=""
                  fill={true}
                  className="!relative z-0 mt-[100px]"
                />
              )}
            </div>

            {/* ImageTitle */}
            <div className="flex w-full items-end justify-start my-0 mx-auto h-[30vw] min-h-[170px] pb-[24px] ml-20 max-md:ml-5">
              {logo && (
                <img
                  src={getImagePath(logo, true)}
                  alt=""
                  className="z-10 w-[50vw] max-w-[600px] "
                />
              )}
            </div>

            {/* ContentMeta */}
            <div className="max-w-[874px] mx-20 max-md:mx-5">
              {/* Controls */}
              <div className="flex items-center flex-nowrap flex-row min-h-[56px] my-[24px] mx-0">
                {/* Player */}
                <button
                  className="text-[15px] my-0 mr-[22px] ml-0 py-0 px-[24px] h-[56px] rounded cursor-pointer flex items-center 
            justify-center text-center uppercase bg-[rgb(249,249,249)] border-none text-black hover:bg-[rgb(198,198,198)]
            max-md:h-[45px]  max-md:px-[12px]   max-md:text-xs max-md:mr-[10px] "
                >
                  <img
                    src="/images/play-icon-black.png"
                    alt=""
                    className="w-[32px] max-md:w-[25px]"
                  />
                  <span>Play</span>
                </button>
                {/* Trailer */}
                <button
                  className="text-[15px] my-0 mr-[22px] ml-0 py-0 px-[24px] h-[56px] rounded cursor-pointer flex items-center 
            justify-center text-center uppercase bg-black/30 border-[1px] border-[rgb(249,249,249)] text-[rgb(249,249,249)] hover:bg-[rgb(198,198,198)]
            max-md:h-[45px]  max-md:px-[12px] max-md:text-xs max-md:mr-[10px] "
                >
                  <img
                    src="/images/play-icon-white.png"
                    alt=""
                    className="w-[32px] max-md:w-[25px]"
                  />
                  <span>Trailer</span>
                </button>
                {/* AddList */}
                <div
                  className="mr-[16px] h-[44px] w-[44px] flex justify-center items-center bg-black/60 rounded-full border-white 
            border-[2px] cursor-pointer"
                >
                  <span className="bg-[rgb(249,249,249)] inline-block h-[2px] w-[16px] translate-x-px translate-y-0 rotate-0" />
                  <span className="bg-[rgb(249,249,249)] inline-block h-[16px] w-[2px] translate-x-[-8px] rotate-0" />
                </div>
                {/* GroupWatch */}
                <div className="h-[44px] w-[44px] rounded-full flex justify-center items-center cursor-pointer bg-white">
                  <div className="h-[40px] w-[40px] bg-black rounded-full">
                    <img
                      className="w-full"
                      src="/images/group-icon.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/* SubTitle */}
              <div className=" text-white text-[rgb(249, 249, 249)] text-[15px] min-h-[20px] max-md:text-xs">
                {subtitle}
              </div>
              {/* Description */}
              <div className="text-white text-[rgb(249, 249, 249)] py-[16px] px-0 text-xl leading-6 max-md:text-sm">
                {overview}
              </div>
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
}

export default VideoDetailsComponent;
