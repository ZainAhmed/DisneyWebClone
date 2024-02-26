import { getTvImages, getTvShowDetails } from "@/lib/api";
import { useSuspenseQueries } from "@tanstack/react-query";

const tvDetailEndpoints = (id: string) => {
  return [
    { key: ["getTvShowDetails", id], func: getTvShowDetails },
    { key: ["getTvImages", id], func: getTvImages },
  ];
};

const useTvData = (id: string, videoType: string) => {
  return useSuspenseQueries({
    queries: tvDetailEndpoints(id).map((tvData) => {
      return {
        queryKey: tvData.key,
        queryFn: async () => await tvData.func(id),
        enabled: videoType == "tv",
      };
    }),
  });
};

export default useTvData;
