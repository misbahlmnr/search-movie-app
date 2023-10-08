import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Section from "../components/Section";
import Images from "../components/images";
import { Loading } from "../components/loading";
import { Season as SeasonInterface } from "../interfaces";
import { getEpisodes } from "../services/api/api";
import { formatDate, tmdbImageSrc } from "../utils";

const Season = () => {
  const { id, seasonNumber } = useParams();
  const [season, setSeason] = useState<null | SeasonInterface>(null);

  const fetch = async () => {
    setSeason(
      await getEpisodes(
        parseInt(id as string),
        parseInt(seasonNumber as string)
      )
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!season) {
    return (
      <div className="fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center">
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
          src={tmdbImageSrc(season.posterPath)}
          className="w-full h-full"
        />
      </div>

      {/* poster and detail */}
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block">
        <Images
          src={tmdbImageSrc(season.posterPath)}
          className="w-[150px] min-w-[150px] min-h-[200px] h-[200px] mobile:mx-auto"
        />

        <div className="px-3 flex flex-col items-start gap-4">
          <p className="text-xl line-clamp-1">{season.title}</p>
          <p className="opacity-[0.9]">
            <b>{season.name}</b> &#8226; {season.episodes.length} Episode
          </p>
        </div>
      </Section>

      {/* Episode */}
      <Section title="Episode">
        {season.episodes.map((episode, idx) => (
          <div
            key={idx}
            className="my-6 flex items-stretch gap-3 rounded-md cursor-pointer"
          >
            <Images
              src={tmdbImageSrc(episode.stillPath)}
              className="min-w-[300px] w-[300px] h-[150px]"
            />
            <div className="overflow-hidden flex flex-col gap-3 w-full">
              <p className="text-lg truncate">
                {episode.episodeNumber}. {episode.title}
              </p>
              <p className="opacity-[0.9] line-clamp-5">{episode.overview}</p>
              <div className="mt-auto pt-3 text-right">
                {formatDate(episode.airDate)}
              </div>
            </div>
          </div>
        ))}
      </Section>
    </>
  );
};

export default Season;
