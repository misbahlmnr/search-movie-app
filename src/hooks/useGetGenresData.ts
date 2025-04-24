import { getGenre } from '@/services/api/api';
import { queryKeys } from '@/services/query/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useGetGenresData = () => {
  return useQuery({
    queryKey: queryKeys.genres,
    queryFn: async () => {
      const movie = await getGenre('movie');
      const tv = await getGenre('tv');
      return { movie, tv };
    },
  });
};

export default useGetGenresData;
