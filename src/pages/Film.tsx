import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Card from '../components/Card';
import Section from '../components/Section';
import Slider from '../components/Slider/Slider';
import TrailerModal from '../components/TrailerModal';
import Images from '../components/images';
import { Loading } from '../components/loading';
import { getDetailData } from '../services/api/actions';
import { StoreContext } from '../services/context';
import { MediaType } from '../types';
import { getThumbnailYoutube, tmdbImageSrc } from '../utils';

interface Props {
  mediaType: MediaType;
}

const Film = (props: Props) => {
  const { state, dispatch } = useContext(StoreContext);
  const {
    detailFilm: { detail, casts, trailers, recomendations },
    genres,
  } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [trailerSrc, setTrailerSrc] = useState<null | string>(null);

  const playTrailer = async (key: string) => {
    setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=0`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    getDetailData(props.mediaType, parseInt(id as string), dispatch);
  }, [location]);

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <TrailerModal onHide={() => setTrailerSrc('')} src={trailerSrc} />
      {/* background imag */}
      <div className="h-[300px] top-0 left-0 right-0 bottom-0 relative">
        <div className="overlay-film-cover" />
        <Images
          src={tmdbImageSrc(detail.coverPath, true)}
          className="w-full h-full"
        />
      </div>

      {/* poster and detail */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Images
          src={tmdbImageSrc(detail.posterPath)}
          className="w-[200px] min-w-[200px] h-[300px] rounded-lg overflow-hidden mobile:mx-auto"
        />

        <div className="px-3 pt-5 flex flex-col items-start gap-4">
          <p className="text-xl line-clamp-1">{detail.title}</p>
          <ul className="flex items-center gap-3 flex-wrap">
            {detail.genreIds.map((id, idx) => (
              <li
                key={idx}
                className="px-3 py-1.5 bg-red-800 rounded-lg text-sm"
              >
                {genres[detail.mediaType].find((g) => g.id === id)?.name}
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-[0.9]">{detail.description}</p>
        </div>
      </Section>

      {/* cast */}
      {casts && (
        <Section title="Cast">
          <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header overflow-x-auto">
            <div className="flex items-center gap-3">
              {casts.map((item, idx) => (
                <div className="flex-shrink-0 w-[200px] my-3" key={idx}>
                  <Card
                    imageSrc={tmdbImageSrc(item.profilePath)}
                    withPlay={false}
                  >
                    <p className="font-semibolb">{item.name}</p>
                    <p className="text-sm opacity-[0.6]">
                      {item.characterName}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* trailers */}
      {trailers.length > 0 && (
        <Section title="Trailers">
          <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header overflow-x-auto">
            <div className="flex items-center gap-3">
              {trailers.map((item, idx) => (
                <Card
                  key={idx}
                  imageSrc={getThumbnailYoutube(item.key)}
                  className="flex-shrink-0 w-[300px]"
                  onClick={() => playTrailer(item.key)}
                />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* seasons */}
      {detail.season.length > 0 && (
        <Section title="Seasons" className="py-0">
          <Slider isMovieCard autoplay slidesToShow={5} slidesToScroll={5}>
            {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                detail.season.map((season, idx) => (
                  <Card
                    key={idx}
                    onClick={() =>
                      navigate(`/tv/${detail.id}/season/${season.seasonNumber}`)
                    }
                    title={season.name}
                    imageSrc={tmdbImageSrc(season.posterPath)}
                    withPlay={false}
                  />
                ))
            }
          </Slider>
        </Section>
      )}

      {/* recomendations */}
      {recomendations.length > 0 && (
        <Section title="Recomendation" className="py-0">
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
                recomendations.map((recomendation, idx) => (
                  <Card
                    onClick={() =>
                      navigate(
                        `/${recomendation.mediaType}/${recomendation.id}`
                      )
                    }
                    key={idx}
                    title={recomendation.title}
                    imageSrc={tmdbImageSrc(recomendation.posterPath)}
                  />
                ))
            }
          </Slider>
        </Section>
      )}
    </>
  );
};

export default Film;
