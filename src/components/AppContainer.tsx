import { Suspense, useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from '@/layout/Body';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import { StoreContext } from '@/services/context';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import useGetGenresData from '@/hooks/useGetGenresData';

const AppContainer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { isLoading } = state;

  const { data, isLoading: isLoadingGenre } = useGetGenresData();

  const loadingBarRef = useRef<LoadingBarRef>(null);

  useEffect(() => {
    dispatch({
      type: 'FETCH_GENRES_DATA',
      data: {
        isLoading: isLoadingGenre,
        ...data,
      },
    });
  }, [data, isLoadingGenre]);

  useEffect(() => {
    if (isLoading) {
      loadingBarRef.current?.start();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <LoadingBar color="#FF0000" ref={loadingBarRef} />
      <Router>
        <Suspense fallback={<LoadingBar color="#FF0000" />}>
          <div className="pb-[64px] font-manrope tracking-wide">
            {/* header */}
            <Header />
            {/* body */}
            <Body />
            {/* footer */}
            <Footer />
          </div>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default AppContainer;
