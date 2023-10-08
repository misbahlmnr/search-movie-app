import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Card from "../components/Card";
import Section from "../components/Section";
import { Film } from "../interfaces";
import { Search, discover, getTopRated } from "../services/api/api";
import { MediaType } from "../types";
import { tmdbImageSrc } from "../utils";

interface Props {
  type: MediaType | "search" | "list";
}

const Catalog = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const page = useRef(1);
  const totalPage = useRef(0);
  const loadingRef = useRef(false);
  const [onLoading, setOnLoading] = useState(false);
  const location = useLocation();
  const [film, setFilm] = useState<Film[]>([]);
  const { listTitle } = useParams();

  let title = "";
  let request: (page: number) => Promise<{
    totalPages: number;
    totalResult?: number;
    films: Film[];
  }>;

  switch (props.type) {
    case "movie":
      title = "Movies";
      request = (page: number) => discover("movie", page);
      break;
    case "tv":
      title = "TV Show";
      request = (page: number) => discover("tv", page);
      break;
    case "search":
      title = `Search result for <i>${params.get("q")}</i>`;
      request = (page: number) => Search(params.get("q") || "", page);
      break;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const titleList = listTitle as string;
      if (titleList === "top-rated-tv") {
        title = "Top Rated TV";
        request = (page: number) => getTopRated("tv", page);
      }
      if (titleList === "top-rated-movie") {
        title = "Top Rated Movies";
        request = (page: number) => getTopRated("movie", page);
      }
      break;
    default:
      break;
  }

  const fetch = async () => {
    loadingRef.current = true;
    setOnLoading(true);
    const { films, totalPages } = await request(page.current);

    setOnLoading(false);
    loadingRef.current = false;
    totalPage.current = totalPages;
    setFilm((arrs) => [...arrs, ...films]);
  };

  const onWindowScroll = () => {
    if (window.innerHeight * window.scrollY >= document.body.scrollHeight) {
      if (totalPage.current > page.current) {
        page.current++;
        fetch();
      }
    }
  };

  useEffect(() => {
    setFilm([]);
    fetch();
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return (
    <>
      {/* background imag */}
      <div className="h-[120px] top-0 left-0 right-0 bottom-0 relative">
        <div className="overlay-film-cover" />
        <div className="w-full h-full bg-primary" />
      </div>

      <Section
        title={title}
        className="flex items-center relative z-10"
      ></Section>
      <Section>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 mobile:grid-cols-2">
          {film.map((film, idx) => (
            <div key={idx}>
              <Card
                onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
                imageSrc={tmdbImageSrc(film.posterPath)}
                title={film.title}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Catalog;
