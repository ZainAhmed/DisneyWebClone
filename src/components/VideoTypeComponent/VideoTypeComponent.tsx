"use client";
import useVideos from "@/hooks/useVideos";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Suspense } from "react";
import ErrorComponent from "../ErrorComponent";
import LoadingSpinner from "../LoadingSpinner";
import VerticalCarousel from "../VerticalCarousel";

type PageProps = {
  videoType: string | undefined;
  types: string;
};
function VideoTypeComponent({ videoType, types }: PageProps) {
  const result = useVideos(types);
  if (result?.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {result?.error ? (
        <ErrorComponent errorMsg={result?.error.message} />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          {result?.data && videoType && (
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
                <h1 className="text-6xl font-bold px-10">
                  {capitalizeFirstLetter(types)}
                </h1>
                <VerticalCarousel movies={result.data} videoType={videoType} />
              </div>
            </div>
          )}
        </Suspense>
      )}
    </>
  );
}

export default VideoTypeComponent;
