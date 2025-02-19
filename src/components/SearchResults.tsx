import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import { Film } from "../interfaces";
import { getGenreData } from "../services/api/actions";
import { Search } from "../services/api/api";
import { StoreContext } from "../services/context";
import { cva, tmdbImageSrc } from "../utils";
import Images from "./images";

interface Props {
  keyword: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  goToSearchPage: Function;
}

const SearchResult = (props: Props) => {
  const { state, dispatch } = useContext(StoreContext);
  const { genres } = state;
  const navigate = useNavigate();
  const [items, setItems] = useState<Film[]>([]);

  const [totalItem, setTotalItem] = useState(0);

  const [keyword] = useDebounce(props.keyword, 1500);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setTimeOutRef = useRef<any>("");

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
    getGenreData(dispatch);
  }, [keyword]);

  return (
    <div
      className={cva(
        "absolute",
        "top-[48px]",
        "left-0",
        "right-0",
        "rounded-md",
        "bg-header",
        "max-h-[450px]",
        "shadow-lg",
        "scrollbar",
        "scrollbar-thumb-primary",
        "scrollbar-track-header",
        "overflow-x-auto"
      )}
    >
      {items.map((film, idx) => (
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
            <p className="text-base truncate font-semibold">{film.title}</p>
            <ul className="flex flex-wrap gap-x-1.5 text-sm">
              {film.genreIds.map((id, idx) => (
                <li key={idx} className="">
                  {genres[film.mediaType].find((g) => g.id === id)?.name}
                  {idx !== film.genreIds.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

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
