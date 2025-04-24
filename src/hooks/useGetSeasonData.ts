import { getEpisodes } from '@/services/api/api';
import { queryKeys } from '@/services/query/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetSeasonData = (id: number, seasonNumber: number) => {
  return useQuery({
    queryKey: queryKeys.season(id),
    queryFn: async () => await getEpisodes(id, seasonNumber),
  });
};

export default useGetSeasonData;
