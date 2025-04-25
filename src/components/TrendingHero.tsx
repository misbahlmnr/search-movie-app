import { MdPlayCircleOutline } from 'react-icons/md';
import { Film } from '../interfaces';
import { tmdbImageSrc } from '../utils';
import Images from './images';

interface Props {
  film: Film;
  onClick: () => void;
  onPlayTrailer: () => void;
}

const TrendingHero = (props: Props) => {
  return (
    <div
      onClick={() => props.onClick()}
      className="h-[400px] relative flex items-center cursor-pointer"
    >
      {/* bg image */}
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <div className="overlay-slick-hero" />
        <Images
          src={tmdbImageSrc(props.film.coverPath, true)}
          className="object-center w-full h-full"
        />
        <div className="overlay-film-cover" />
      </div>
      {/* text */}
      <div className="flex flex-col gap-4 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-[100%]">
        <p className="text-2xl font-bold line-clamp-1">{props.film.title}</p>
        <p className="text-sm line-clamp-3">{props.film.description}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onPlayTrailer();
          }}
          className="px-3 py-1.5 flex items-center gap-3 bg-red-800 rounded-md hover:cursor-pointer"
        >
          <MdPlayCircleOutline size={18} />
          <span>Play Trailer</span>
        </button>
      </div>
    </div>
  );
};

export default TrendingHero;
