import { MediaType } from '@/types';

export const queryKeys = {
  genres: ['genres'],
  theaters: ['theaters'],
  popular: (media: MediaType) => ['popular', media],
  trending: (media: MediaType) => ['trending', media],
  topRated: (media: MediaType) => ['topRated', media],
  detail: (id: number, media: MediaType) => ['detail', id, media],
  casts: (id: number, media: MediaType) => ['casts', id, media],
  trailers: (id: number, media: MediaType) => ['trailers', id, media],
  recommendations: (id: number, media: MediaType) => [
    'recommendations',
    id,
    media,
  ],
  season: (id: number) => ['season', id],
};
