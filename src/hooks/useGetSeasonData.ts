import { getEpisodes } from '@/services/api';
import { queryKeys } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetSeasonData = (id: number, seasonNumber: number) => {
  return useQuery({
    queryKey: queryKeys.season(id),
    queryFn: async () => await getEpisodes(id, seasonNumber),
  });
};

export default useGetSeasonData;
