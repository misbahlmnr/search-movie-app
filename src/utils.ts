import { useNavigate } from 'react-router';
import { Film, Season } from './interfaces';
import { getTrailers } from './services/api';
import { MediaType } from './types';

export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + ' ' + (val2 || '');
};

export const cva = (...args: string[]) => args.join(' ');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatResult = (obj: any, mediaType?: MediaType): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverPath: obj.backdrop_path,
    posterPath: obj.poster_path,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genreIds: obj?.genre_ids || obj.genres.map((g: any) => g.id) || [],
    mediaType: mediaType || obj.media_type,
    season: obj?.seasons
      ? obj.seasons.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (season: any) =>
            ({
              id: season.id,
              name: season.name,
              title: obj.title || obj.name,
              seasonNumber: season.season_number,
              posterPath: season.poster_path,
              episodes: [],
            } satisfies Season)
        )
      : [],
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFilm = (film: any): film is Film => {
  return <Film>film !== undefined;
};

export const tmdbImageSrc = (path: string, isHd = false) => {
  const baseImageURI = import.meta.env.VITE_REACT_APP_TMDB_API_IMAGE_URL;
  const quality = isHd ? 'original' : 'w500';
  if (path) {
    return baseImageURI + quality + path;
  }
  return baseImageURI;
};

export const mergeFilm = (movie: Film[], tvs: Film[], limit = 6) => {
  const arrs: Film[] = [];

  for (let i = 0; i < limit; i++) {
    let film: unknown;

    if (i % 2 == 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1];
      }
    } else {
      if (movie[i - 1]) {
        film = movie[i - 1];
      }
    }

    if (isFilm(film)) arrs.push(film);
  }

  return arrs;
};

export const getThumbnailYoutube = (key: string) => {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
};

export const formatDate = (date: string) => {
  const nowDate = new Date(date);
  return (
    nowDate.getDate() + '/' + nowDate.getMonth() + '/' + nowDate.getFullYear()
  );
};

export const playTrailer = async (film: Film) => {};

export const goToDetailHome = (
  navigate: any,
  mediaType: MediaType,
  id: number
): void => {
  navigate(`/${mediaType}/${id}`);
};
