import {
  getCasts,
  getDetail,
  getRecomendation,
  getTrailers,
} from '@/services/api';
import { queryKeys } from '@/constant/queryKeys';
import { MediaType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetDetailData = (id: number, mediaType: MediaType) => {
  const detailData = useQuery({
    queryKey: queryKeys.detail(id, mediaType),
    queryFn: async () => {
      return await getDetail(mediaType, id);
    },
  });
  const casts = useQuery({
    queryKey: queryKeys.casts(id, mediaType),
    queryFn: async () => {
      return await getCasts(mediaType, id);
    },
  });
  const trailers = useQuery({
    queryKey: queryKeys.trailers(id, mediaType),
    queryFn: async () => {
      return await getTrailers(mediaType, id);
    },
  });
  const recommendations = useQuery({
    queryKey: queryKeys.recommendations(id, mediaType),
    queryFn: async () => {
      return await getRecomendation(mediaType, id);
    },
  });

  const isLoading =
    detailData.isLoading ||
    casts.isLoading ||
    trailers.isLoading ||
    recommendations.isLoading;

  if (isLoading) {
    return {
      isLoading: true,
      data: {
        detail: null,
        casts: [],
        trailers: [],
        recommendations: [],
      },
    };
  }
  return {
    isLoading,
    data: {
      detail: detailData.data,
      casts: casts.data,
      trailers: trailers.data,
      recommendations: recommendations.data,
    },
  };
};

export default useGetDetailData;
