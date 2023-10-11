import { Dispatch } from "react";
import { MediaType } from "../../types";
import { mergeFilm } from "../../utils";
import {
  getCasts,
  getDetail,
  getGenre,
  getInTheaters,
  getPopuler,
  getRecomendation,
  getTopRated,
  getTrailers,
  getTrending,
} from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getHomeData = async (dispatch: Dispatch<any>) => {
  try {
    const theaters = await getInTheaters();
    const populars = mergeFilm(
      await getPopuler("movie"),
      await getPopuler("tv")
    );
    const trendings = mergeFilm(
      await getTrending("movie"),
      await getTrending("tv")
    );
    const topRatedMovies = await getTopRated("movie");
    const topRatedTVShow = await getTopRated("tv");

    const data = {
      theaters,
      populars,
      trendings,
      topRatedMovies: topRatedMovies.films,
      topRatedTVShow: topRatedTVShow.films,
    };

    dispatch({
      type: "FETCH_HOME_DATA",
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

const getDetailData = async (
  mediaType: MediaType,
  idFilm: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>
) => {
  try {
    const detail = await getDetail(mediaType, idFilm);
    const casts = await getCasts(mediaType, idFilm);
    const trailers = await getTrailers(mediaType, idFilm);
    const recommendations = await getRecomendation(mediaType, idFilm);

    const data = {
      detail,
      casts,
      trailers,
      recommendations,
    };

    dispatch({
      type: "FETCH_DETAIL_DATA",
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGenreData = async (dispatch: Dispatch<any>) => {
  try {
    const movie = await getGenre("movie");
    const tv = await getGenre("tv");

    dispatch({
      type: "FETCH_GENRES_DATA",
      data: { tv, movie },
    });
  } catch (err) {
    console.error(err);
  }
};

export { getDetailData, getGenreData, getHomeData };
