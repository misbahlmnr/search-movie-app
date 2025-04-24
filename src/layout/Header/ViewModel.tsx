import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

type Return = {
  keyword: string;
  pathName: string;
  isSearchFocuss: boolean;
  setIsSearchFocuss: (value: boolean) => void;
  setKeyword: (value: string) => void;
  goToSearchPage: () => void;
};

export const useViewModel = (): Return => {
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [pathName, setPathName] = useState('');
  const pathNameRef = useRef('');
  const defaultKeywordRef = useRef('');
  const [keyword, setKeyword] = useState<string>('');
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
    if (pathNameRef.current === '/search') {
      setKeyword(defaultKeywordRef.current);
    } else {
      setKeyword('');
    }
  };

  const onWindowClick = () => {
    setIsSearchFocuss(false);
  };

  useEffect(() => {
    window.addEventListener('click', () => onWindowClick());

    return () => {
      window.removeEventListener('click', () => onWindowClick());
    };
  });

  useEffect(() => {
    setPathName(location.pathname);
    pathNameRef.current = location.pathname;
    defaultKeywordRef.current = params.get('q') || '';
    initKeyword();
  }, [location.pathname]);

  return {
    keyword,
    pathName,
    isSearchFocuss,
    setIsSearchFocuss,
    setKeyword,
    goToSearchPage,
  };
};
