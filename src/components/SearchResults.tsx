import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from 'use-debounce';
import { Film } from '../interfaces';
import { Search } from '@/services/api';
import { cva, tmdbImageSrc } from '../utils';
import Images from './images';
import useGetGenresData from '@/hooks/useGetGenresData';

interface Props {
  keyword: string;
  goToSearchPage: Function;
}

const SearchResult = (props: Props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Film[]>([]);

  const [totalItem, setTotalItem] = useState(0);

  const { data: dataGenres } = useGetGenresData();

  const [keyword] = useDebounce(props.keyword, 1500);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTimeOutRef = useRef<any>('');

  const Fetch = async () => {
    if (!keyword) return;

    clearInterval(setTimeOutRef.current);
    setTimeOutRef.current = setTimeout(async () => {
      const res = await Search(keyword);
      setTotalItem(res.totalResult);
      setItems(res.films);
    }, 120);
  };

  useEffect(() => {
    Fetch();
  }, [keyword]);

  console.log('items', items);

  return (
    <div
      className={cva(
        'absolute',
        'top-[48px]',
        'left-0',
        'right-0',
        'rounded-md',
        'bg-header',
        'max-h-[450px]',
        'shadow-lg',
        'scrollbar',
        'scrollbar-thumb-primary',
        'scrollbar-track-header',
        'overflow-x-auto'
      )}
    >
      {items.length > 0 ? (
        items.map((film, idx) => (
          <div
            onClick={() => navigate(`/${film.mediaType}/${film.id}/`)}
            key={idx}
            className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
          >
            {/* images */}
            <Images
              src={tmdbImageSrc(film.posterPath)}
              className="h-[72px] min-w-[102px] w-[102px]"
            />
            {/* title and genres */}
            <div className="px-3 truncate">
              <p className="text-base font-semibold truncate">{film.title}</p>
              <ul className="flex flex-wrap gap-x-1.5 text-sm">
                {film.genreIds.map((id, idx) => (
                  <li key={idx} className="">
                    {dataGenres &&
                      dataGenres[film.mediaType].find((g) => g.id === id)?.name}
                    {idx !== film.genreIds.length - 1 ? ', ' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-[80px]">
          <p className="text-center">No result found</p>
        </div>
      )}

      {totalItem > 5 && (
        <button
          onClick={() => props.goToSearchPage()}
          type="button"
          className="px-3 py-1.5 w-full bg-primary text-slate-100 hover:text-slate-500 sticky bottom-0 shadow-lg"
        >
          View more
        </button>
      )}
    </div>
  );
};

export default SearchResult;
