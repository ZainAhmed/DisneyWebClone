import { getTvImages, getTvShowDetails } from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const tvDetailEndpoints = (id: string, videoType: string) => {
  if (videoType !== "tv") return [];
  return [
    { key: ["getTvShowDetails", id], func: getTvShowDetails },
    { key: ["getTvImages", id], func: getTvImages },
  ];
};

const useTvDetails = (id: string, videoType: string) => {
  return useSuspenseQueries({
    queries: tvDetailEndpoints(id, videoType).map((tvData) => {
      return {
        queryKey: tvData.key,
        queryFn: async () => await tvData.func(id),
      };
    }),
  });
};

export default useTvDetails;
