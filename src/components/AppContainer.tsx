import { Suspense, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import Body from '@/layout/Body';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import GlobalErrorFallback from './GlobalErrorFallback';

const AppContainer = () => {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      loadingBarRef.current?.start();
      setTimeout(() => {
        loadingBarRef.current?.complete();
      }, 0);
    }
  }, [location]);

  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>
      <LoadingBar color="#FF0000" ref={loadingBarRef} />
      <Suspense fallback={<LoadingBar color="#FF0000" />}>
        <div className="pb-[64px] min-h-screen h-full flex flex-col font-manrope tracking-wide">
          {/* header */}
          <Header />
          {/* body */}
          <Body />
          {/* footer */}
          <Footer />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppContainer;
