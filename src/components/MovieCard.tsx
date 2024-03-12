"use client";
import { Movie, TvShow } from "@/Types/ComponentTypes";
import getImagePath from "@/lib/getImagePath";
import { isTvShow } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
type PropsType = {
  video: Movie | TvShow;
  videoType: string;
};
function MovieCard({ video, videoType }: PropsType) {
  return (
    <Link href={`/details/${videoType}/${video.id}`}>
      <div className="flex-shrink-0 relative cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-[#1A1C29]/80 z-10" />
        <p className="absolute z-20 bottom-5 left-5">
          {isTvShow(video) ? video.name : video.title}
        </p>
        {(video.backdrop_path || video.poster_path) && (
          <Image
            className="w-fit min-w-[200px] lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl
           rounded-sm"
            src={getImagePath(video.backdrop_path || video.poster_path)}
            alt={video.title || "default"}
            width={1920}
            height={1080}
            key={video.id}
          />
        )}
      </div>
    </Link>
  );
}

export default MovieCard;
