import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "../components/Card";
import Section from "../components/Section";
import Slider from "../components/Slider/Slider";
import TrailerModal from "../components/Trailer-modal";
import TrendingHero from "../components/Trending-hero";
import { Film } from "../interfaces";
import { getHomeData } from "../services/api/actions";
import { getTrailers } from "../services/api/api";
import { StoreContext } from "../services/context";
import { MediaType } from "../types";
import { tmdbImageSrc } from "../utils";

const Home = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { trendings, populars, theaters, topRated } = state;
  const [trailerSrc, setTrailerSrc] = useState<null | string>(null);

  const navigate = useNavigate();

  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id);
    setTrailerSrc(
      `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    );
  };

  const goToDetailHome = (mediaType: MediaType, id: number) =>
    navigate(`/${mediaType}/${id}`);

  useEffect(() => {
    getHomeData(dispatch);
  }, []);

  return (
    <>
      <TrailerModal onHide={() => setTrailerSrc("")} src={trailerSrc} />
      {/* Trending */}
      <Section className="py-0">
        <Slider
          className="slick-hero"
          autoplay
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) =>
            trendings.map((film, idx) => (
              <TrendingHero
                key={idx}
                film={film}
                onPlayTrailer={() => playTrailer(film)}
                onClick={() =>
                  !onSwipe ? goToDetailHome(film.mediaType, film.id) : ""
                }
              />
            ))
          }
        </Slider>
      </Section>

      {/* In theater */}
      <Section title="In Theaters" className="py-0">
        <Slider isMovieCard autoplay slidesToShow={5} slidesToScroll={5}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              theaters.map((film, idx) => (
                <Card
                  onClick={() => goToDetailHome(film.mediaType, film.id)}
                  key={idx}
                  title={film.title}
                  imageSrc={tmdbImageSrc(film.posterPath)}
                />
              ))
          }
        </Slider>
      </Section>

      {/* populers */}
      <Section title="What's Popular" className="py-0">
        <Slider isMovieCard autoplay slidesToShow={5} slidesToScroll={5}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              populars.map((film, idx) => (
                <Card
                  onClick={() => goToDetailHome(film.mediaType, film.id)}
                  key={idx}
                  title={film.title}
                  imageSrc={tmdbImageSrc(film.posterPath)}
                />
              ))
          }
        </Slider>
      </Section>

      {/* Top Rated TV */}
      <Section
        title="Top Rated TV Show"
        className="py-0"
        onTitleClick={() => navigate(`/list/top-rated-tv`)}
      >
        <Slider isMovieCard autoplay slidesToShow={5} slidesToScroll={5}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              topRated.topRatedTV.map((film, idx) => (
                <Card
                  onClick={() => goToDetailHome(film.mediaType, film.id)}
                  key={idx}
                  title={film.title}
                  imageSrc={tmdbImageSrc(film.posterPath)}
                />
              ))
          }
        </Slider>
      </Section>

      {/* Top Rated Movies */}
      <Section
        title="Top Rated Movies"
        className="py-0"
        onTitleClick={() => navigate(`/list/top-rated-movie`)}
      >
        <Slider isMovieCard autoplay slidesToShow={5} slidesToScroll={5}>
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              topRated.topRatedMovies.map((film, idx) => (
                <Card
                  onClick={() => goToDetailHome(film.mediaType, film.id)}
                  key={idx}
                  title={film.title}
                  imageSrc={tmdbImageSrc(film.posterPath)}
                />
              ))
          }
        </Slider>
      </Section>
    </>
  );
};

export default Home;
