import {
  getMovieDetails,
  getMovieImages,
  getTvImages,
  getTvShowDetails,
} from "@/lib/api";
import getImagePath from "@/lib/getImagePath";
import Image from "next/image";

type PageProps = {
  params: {
    videoType: string;
    id: string;
  };
};
async function Details({ params }: PageProps) {
  const { videoType, id } = params;
  let detailData;
  let imageData;
  switch (videoType) {
    case "tv":
      detailData = await getTvShowDetails(id);
      imageData = await getTvImages(id);
      break;
    case "movie":
      detailData = await getMovieDetails(id);
      imageData = await getMovieImages(id);
      break;
    default:
      break;
  }
  console.log(imageData?.backdrops[0].width, imageData?.backdrops[0].height);
  return (
    <div className="relative min-h-[calc(100vh-250px)] overflow-x-hidden block top-[72px] py-0 px-[calc(3.5vw + 5px)]">
      <div className="fixed left-0 right-0 top-0 opacity-80 z-[-1]">
        <Image
          src={getImagePath(
            imageData?.backdrops[0].file_path ||
              detailData?.poster_path ||
              detailData?.backdrop_path
          )}
          alt=""
          fill={true}
          // quality={100}
          // className="!relative"
          style={{ marginTop: "100px" }}
        />
      </div>
    </div>
  );
}

export default Details;
