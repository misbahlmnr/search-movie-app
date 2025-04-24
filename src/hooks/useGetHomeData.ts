import { Film } from '@/interfaces';
import {
  getInTheaters,
  getPopuler,
  getTopRated,
  getTrending,
} from '@/services/api/api';
import { queryKeys } from '@/services/query/queryKeys';
import { mergeFilm } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const useGetHomeData = () => {
  const theaters = useQuery({
    queryKey: queryKeys.theaters,
    queryFn: getInTheaters,
  });
  const popularMovies = useQuery({
    queryKey: queryKeys.popular('movie'),
    queryFn: () => getPopuler('movie'),
  });
  const popularTV = useQuery({
    queryKey: queryKeys.popular('tv'),
    queryFn: () => getPopuler('tv'),
  });
  const trendingMovies = useQuery({
    queryKey: queryKeys.trending('movie'),
    queryFn: () => getTrending('movie'),
  });
  const trendingTv = useQuery({
    queryKey: queryKeys.trending('tv'),
    queryFn: () => getTrending('tv'),
  });
  const topRatedMovies = useQuery({
    queryKey: queryKeys.topRated('movie'),
    queryFn: () => getTopRated('movie'),
  });
  const topRatedTV = useQuery({
    queryKey: queryKeys.topRated('tv'),
    queryFn: () => getTopRated('tv'),
  });

  const isLoading =
    theaters.isLoading ||
    popularMovies.isLoading ||
    popularTV.isLoading ||
    trendingMovies.isLoading ||
    trendingTv.isLoading ||
    topRatedMovies.isLoading ||
    topRatedTV.isLoading;

  if (isLoading) {
    return {
      isLoading: true,
      data: {
        theaters: [],
        populars: [],
        trendings: [],
        topRatedMovies: [],
        topRatedTVShow: [],
      },
    };
  }

  return {
    isLoading,
    data: {
      theaters: theaters.data,
      populars: mergeFilm(
        popularMovies.data as Film[],
        popularTV.data as Film[]
      ),
      trendings: mergeFilm(
        trendingMovies.data as Film[],
        trendingTv.data as Film[]
      ),
      topRatedMovies: topRatedMovies.data?.films,
      topRatedTVShow: topRatedTV.data?.films,
    },
  };
};

export default useGetHomeData;
