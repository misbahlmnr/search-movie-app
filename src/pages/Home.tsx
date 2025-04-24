import { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from '@components/Card';
import Section from '@components/Section';
import Slider from '@components/Slider/Slider';
import TrailerModal from '@components/TrailerModal';
import TrendingHero from '@components/TrendingHero';
import { Film } from '../interfaces';
import { getTrailers } from '@/services/api/api';
import { goToDetailHome, tmdbImageSrc } from '../utils';
import useGetHomeData from '@/hooks/useGetHomeData';

const Home = () => {
  const [trailerSrc, setTrailerSrc] = useState<null | string>(null);

  const { isLoading, data } = useGetHomeData();
  const { trendings, populars, theaters, topRatedMovies, topRatedTVShow } =
    data;

  const navigate = useNavigate();

  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id);
    setTrailerSrc(
      `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    );
  };

  return (
    <>
      <TrailerModal onHide={() => setTrailerSrc('')} src={trailerSrc} />
      {/* Trending */}
      <Section className="py-0">
        <Slider
          className="slick-hero"
          autoplay
          slidesToShow={1}
          slidesToScroll={1}
        >
          {(onSwipe) => {
            console.log('onSwipe', onSwipe);
            return trendings.map((film, idx) => (
              <TrendingHero
                key={idx}
                film={film}
                onPlayTrailer={() => playTrailer(film)}
                onClick={() =>
                  !onSwipe
                    ? goToDetailHome(navigate, film.mediaType, film.id)
                    : null
                }
              />
            ));
          }}
        </Slider>
      </Section>

      {/* In theater */}
      <Section title="In Theaters" className="py-0">
        <Slider
          isMovieCard
          autoplay
          slidesToShow={5}
          slidesToScroll={5}
          className="custom-slider"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              theaters &&
              theaters.map((film, idx) => (
                <Card
                  onClick={() =>
                    goToDetailHome(navigate, film.mediaType, film.id)
                  }
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
        <Slider
          isMovieCard
          autoplay
          slidesToShow={5}
          slidesToScroll={5}
          className="custom-slider"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              populars.map((film, idx) => (
                <Card
                  onClick={() =>
                    goToDetailHome(navigate, film.mediaType, film.id)
                  }
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
        <Slider
          isMovieCard
          autoplay
          slidesToShow={5}
          slidesToScroll={5}
          className="custom-slider"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              topRatedMovies &&
              topRatedMovies.map((film, idx) => (
                <Card
                  onClick={() =>
                    goToDetailHome(navigate, film.mediaType, film.id)
                  }
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
        <Slider
          isMovieCard
          autoplay
          slidesToShow={5}
          slidesToScroll={5}
          className="custom-slider"
        >
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) =>
              topRatedTVShow &&
              topRatedTVShow.map((film, idx) => (
                <Card
                  onClick={() =>
                    goToDetailHome(navigate, film.mediaType, film.id)
                  }
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
