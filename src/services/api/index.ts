import axios, { AxiosResponse } from "axios";
import { Cast, Episode, Film, Genre, Season, Trailer } from "../../interfaces";
import { MediaType } from "../../types";
import { formatResult } from "../../utils";

const axiosClient = axios.create({
  /* 
  process is replace to import.meta
  */
  baseURL: import.meta.env.VITE_REACT_APP_TMDB_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      /* 
      process is replace to import.meta
      */
      api_key: import.meta.env.VITE_REACT_APP_TMDB_API_KEY,
    },
  };
});

export const getTrending = async (mediaType: MediaType): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ results: unknown[] }>
    >(`/trending/${mediaType}/week`);

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getInTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ results: unknown[] }>
    >(`/movie/now_playing`);

    return data.results.map((val) => formatResult(val, "movie"));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getPopuler = async (
  mediaType: MediaType,
  page = 1
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ results: unknown[] }>
    >(`/${mediaType}/popular`, {
      params: {
        page,
      },
    });

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getTopRated = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  totalPages: number;
  films: Film[];
}> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ total_pages: number; results: unknown[] }>
    >(`/${mediaType}/top_rated`, {
      params: {
        page,
      },
    });

    return {
      totalPages: data.total_pages,
      films: data.results.map((val) => formatResult(val, mediaType)),
    };
  } catch (err) {
    console.error(err);
  }

  return {
    totalPages: 0,
    films: [],
  };
};

export const Search = async (
  query: string,
  page = 1
): Promise<{
  totalPages: number;
  totalResult: number;
  films: Film[];
}> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{
        total_pages: number;
        total_results: number;
        results: unknown[];
      }>
    >(`/search/multi`, {
      params: {
        query,
        page,
      },
    });

    console.log(data);

    return {
      totalPages: data.total_pages,
      totalResult: data.total_results,
      films: data.results.map((val) => formatResult(val)),
    };
  } catch (err) {
    console.error(err);
  }

  return {
    totalPages: 0,
    totalResult: 0,
    films: [],
  };
};

export const getGenre = async (mediaType: MediaType): Promise<Genre[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{
        genres: unknown[];
      }>
    >(`/genre/${mediaType}/list`);
    return data.genres as Genre[];
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getDetail = async (
  mediaType: MediaType,
  id: number
): Promise<null | Film> => {
  try {
    const { data } = await axiosClient.get(`/${mediaType}/${id}`);
    return formatResult(data, mediaType);
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const getCasts = async (
  mediaType: MediaType,
  id: number
): Promise<Cast[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      AxiosResponse<{ cast: any[] }>
    >(`/${mediaType}/${id}/credits`);

    return data.cast.map((item) => ({
      id: item.id,
      name: item.name,
      characterName: item.character,
      profilePath: item.profile_path,
    }));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getTrailers = async (
  mediaType: MediaType,
  id: number
): Promise<Trailer[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      AxiosResponse<{ results: any[] }>
    >(`/${mediaType}/${id}/videos`);

    return data.results.map((item) => ({
      id: item.id,
      key: item.key,
    }));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getRecomendation = async (
  mediaType: MediaType,
  id: number
): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ results: unknown[] }>
    >(`/${mediaType}/${id}/recommendations`);

    return data.results.map((val) => formatResult(val, mediaType));
  } catch (err) {
    console.error(err);
  }

  return [];
};

export const getEpisodes = async (
  tvId: number,
  seasonNumber: number
): Promise<null | Season> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await axiosClient.get<any, any>(
      `/tv/${tvId}/season/${seasonNumber}`
    );

    const film = await getDetail("tv", tvId);

    return {
      id: data.id,
      name: data.name,
      title: film?.title || "",
      seasonNumber: data.season_number,
      posterPath: data.poster_path,
      episodes: data.episodes.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (episod: any) =>
          ({
            id: episod.id,
            title: episod.name,
            overview: episod.overview,
            airDate: episod.air_date,
            stillPath: episod.still_path,
            episodeNumber: episod.episode_number,
          } satisfies Episode)
      ),
    };
  } catch (err) {
    console.error(err);
  }

  return null;
};

export const discover = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  totalPages: number;
  films: Film[];
}> => {
  try {
    const { data } = await axiosClient.get<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      AxiosResponse<{ total_pages: number; results: unknown[] }>
    >(`/discover/${mediaType}`, {
      params: {
        page,
      },
    });

    return {
      totalPages: data.total_pages,
      films: data.results.map((val) => formatResult(val, mediaType)),
    };
  } catch (err) {
    console.error(err);
  }

  return {
    totalPages: 0,
    films: [],
  };
};
