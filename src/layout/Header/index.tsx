import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Container from '@/components/Container';
import SearchResult from '@/components/SearchResults';
import { cva, mergeClassName } from '@/utils';
import Logo from '@/assets/logo.png';
import { useViewModel } from './ViewModel';

const MENU_CLASS = cva('px-6', 'py-1.5', 'rounded-md', 'hover:bg-primary');
const MENU_CLASS_ACTIVE = 'bg-primary';

const Header = () => {
  const {
    keyword,
    pathName,
    isSearchFocuss,
    setIsSearchFocuss,
    setKeyword,
    goToSearchPage,
  } = useViewModel();

  const getMenuClass = (path: string) => {
    if (path === pathName) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE);
    }
    return mergeClassName(MENU_CLASS, '');
  };

  return (
    <div className="bg-header sticky top-0 z-[99] transition-all duration-700 ease-in-out">
      <Container className="flex items-center justify-between gap-3">
        <div
          className={mergeClassName(
            'flex items-center gap-6',
            isSearchFocuss ? 'mobile:hidden' : ''
          )}
        >
          <div className="mt-1">
            <Link to={'/'}>
              <img src={Logo} alt="Search Movie" className="w-[200px]" />
            </Link>
          </div>
          <div
            className={cva(
              'flex',
              'items-center',
              'gap-1.5',
              'mobile:fixed',
              'mobile:bottom-0',
              'mobile:right-0',
              'mobile:left-0',
              'mobile:bg-header',
              'mobile:justify-center',
              'py-2'
            )}
          >
            <Link className={getMenuClass('/movies')} to={'/movies'}>
              Movies
            </Link>
            <Link className={getMenuClass('/tv')} to={'/tv'}>
              Tv
            </Link>
          </div>
        </div>
        <div
          className={cva(
            'bg-primary',
            'h-[40px]',
            'rounded-lg',
            'flex',
            'items-center',
            'justify-center',
            'p-2',
            'flex-[0.5]',
            'focus-within:border-primary',
            'relative',
            'mobile:flex-1'
          )}
        >
          <input
            type="text"
            name="search"
            id="search"
            value={keyword}
            placeholder="Search..."
            autoComplete="off"
            className="flex-1 bg-transparent outline-0"
            onInput={(e) => setKeyword(e.currentTarget.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
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
