import { Cast, Film, Genre, Trailer } from "../../interfaces";
import { MediaType } from "../../types";

type State = {
  theaters: Film[];
  trendings: Film[];
  populars: Film[];
  topRated: {
    topRatedMovies: Film[];
    topRatedTV: Film[];
  };
  detailFilm: {
    detail: Film | null;
    casts: Cast[];
    trailers: Trailer[];
    recomendations: Film[];
  };
  genres: {
    [key in MediaType]: Genre[];
  };
  loading: boolean;
};

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type { Action, State };
