import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Container from "../components/Container";
import SearchResult from "../components/search-result";
import { cva, mergeClassName } from "../utils";

const MENU_CLASS = cva("px-6", "py-1.5", "rounded-md", "hover:bg-primary");

const MENU_CLASS_ACTIVE = "bg-primary";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, _] = useSearchParams();

  const [pathName, setPathName] = useState("");
  const pathNameRef = useRef("");
  const defaultKeywordRef = useRef("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [keyword, setKeyword] = useState<any>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSearchFocuss, setIsSearchFocuss] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeywordRef.current = keyword;
      navigate(`/search?q=${keyword}`);
      setIsSearchFocuss(false);
      searchRef.current?.blur();
    }
  };

  const initKeyword = () => {
    if (pathNameRef.current === "/search") {
      setKeyword(defaultKeywordRef.current);
    } else {
      setKeyword("");
    }
  };

  const getMenuClass = (path: string) => {
    if (path === pathName) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE);
    }
    return mergeClassName(MENU_CLASS, "");
  };

  const onWindowClick = () => {
    setIsSearchFocuss(false);
    initKeyword();
  };

  useEffect(() => {
    window.addEventListener("click", () => onWindowClick());

    return () => {
      window.removeEventListener("click", () => onWindowClick());
    };
  });

  useEffect(() => {
    setPathName(location.pathname);
    pathNameRef.current = location.pathname;
    defaultKeywordRef.current = params.get("q") || "";
    initKeyword();
  }, [location.pathname]);

  return (
    <div className="bg-header sticky top-0 z-[99]">
      <Container className="flex justify-between gap-3">
        <div
          className={mergeClassName(
            "flex items-center gap-6",
            isSearchFocuss ? "mobile:hidden" : ""
          )}
        >
          <h1 className="text-2xl">
            <Link to={"/"}>Movies</Link>
          </h1>
          <div
            className={cva(
              "flex",
              "items-center",
              "gap-1.5",
              "mobile:fixed",
              "mobile:bottom-0",
              "mobile:right-0",
              "mobile:left-0",
              "mobile:bg-header",
              "mobile:justify-center",
              "py-2"
            )}
          >
            <Link className={getMenuClass("/movies")} to={"/movies"}>
              Movies
            </Link>
            <Link className={getMenuClass("/tv")} to={"/tv"}>
              Tv
            </Link>
          </div>
        </div>
        <div
          className={cva(
            "border-b-[1.5px]",
            "border-white",
            "flex",
            "items-center",
            "p-1",
            "flex-[0.5]",
            "focus-within:border-primary",
            "relative",
            "mobile:flex-1"
          )}
        >
          <input
            type="text"
            name="search"
            id="search"
            value={keyword}
            placeholder="Search..."
            autoComplete="off"
            className="bg-transparent outline-0 flex-1"
            onInput={(e) => setKeyword(e.currentTarget.value)}
            onKeyDown={(e) => (e.key === "Enter" ? goToSearchPage() : "")}
            onClick={(e) => {
              e.stopPropagation();
              setIsSearchFocuss(true);
            }}
          />
          <IoIosSearch size={18} />

          {/* result */}
          {isSearchFocuss && keyword && (
            <SearchResult keyword={keyword} goToSearchPage={goToSearchPage} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
