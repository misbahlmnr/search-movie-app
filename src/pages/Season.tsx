import { useLocation, useParams } from 'react-router';
import Section from '../components/Section';
import Images from '../components/images';
import { Loading } from '../components/loading';
import { formatDate, tmdbImageSrc } from '../utils';
import useGetSeasonData from '@/hooks/useGetSeasonData';
import { useEffect } from 'react';

const Season = () => {
  const { id, seasonNumber } = useParams();
  const location = useLocation();

  const { data, isLoading } = useGetSeasonData(
    parseInt(id as string),
    parseInt(seasonNumber as string)
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [location]);

  useEffect(() => {
    if (data) {
      document.title = `Season ${data.name} - Search Movie`;
    }

    return () => {
      document.title = 'Search Movie - Cari Film Terbaik Versimu';
    };
  }, [data]);

  if (!data || isLoading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* background imag */}
      <div className="h-[150px] top-0 left-0 right-0 bottom-0 relative">
        <div className="overlay-film-cover" />
        <Images
          src={tmdbImageSrc(data.posterPath, true)}
          className="w-full h-full"
        />
      </div>

      {/* poster and detail */}
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
        <Images
          src={tmdbImageSrc(data.posterPath)}
          className="w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
        />

        <div className="flex flex-col items-start gap-4 px-3">
          <p className="text-xl line-clamp-1">{data.title}</p>
          <p className="opacity-[0.9]">
            <b>{data.name}</b> &#8226; {data.episodes.length} Episode
          </p>
        </div>
      </Section>

      {/* Episode */}
      <Section title="Episode">
        {data.episodes.length > 0 ? (
          data.episodes.map((episode, idx) => (
            <div
              key={idx}
              className="flex items-stretch gap-3 my-6 rounded-md cursor-pointer"
            >
              <Images
                src={tmdbImageSrc(episode.stillPath)}
                className="min-w-[300px] w-[300px] h-[150px]"
              />
              <div className="flex flex-col w-full gap-3 overflow-hidden">
                <p className="text-lg truncate">
                  {episode.episodeNumber}. {episode.title}
                </p>
                <p className="opacity-[0.9] line-clamp-5">{episode.overview}</p>
                <div className="pt-3 mt-auto text-right">
                  {formatDate(episode.airDate)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[80px]">
            <p className="text-center">No episode found</p>
          </div>
        )}
      </Section>
    </>
  );
};

export default Season;
