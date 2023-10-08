import { createContext, ReactNode, useReducer } from "react";
import { Action, State } from "./types";

const initialState: State = {
  theaters: [],
  trendings: [],
  populars: [],
  topRated: {
    topRatedMovies: [],
    topRatedTV: [],
  },
  detailFilm: {
    detail: null,
    casts: [],
    trailers: [],
    recomendations: [],
  },
  genres: {
    tv: [],
    movie: [],
  },
  loading: true,
};

type StoreContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "FETCH_HOME_DATA":
      return {
        ...state,
        theaters: action.data.theaters,
        trendings: action.data.trendings,
        populars: action.data.populars,
        topRated: {
          ...state.topRated,
          topRatedMovies: action.data.topRatedMovies,
          topRatedTV: action.data.topRatedTVShow,
        },
      };
    case "FETCH_GENRES_DATA":
      return {
        ...state,
        genres: {
          tv: action.data.tv,
          movie: action.data.movie,
        },
      };
    case "FETCH_SEARCH_DATA":
      return {
        ...state,
      };
    case "FETCH_DETAIL_DATA":
      return {
        ...state,
        detailFilm: {
          ...state.detailFilm,
          detail: action.data.detail,
          casts: action.data.casts,
          trailers: action.data.trailers,
          recomendations: action.data.recommendations,
        },
      };
    default:
      return state;
  }
};

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { reducer, StoreContext, StoreProvider };
