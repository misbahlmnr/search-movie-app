import { SkeletonTheme } from 'react-loading-skeleton';
import { Route, Routes } from 'react-router';
import Catalog from '../pages/Catalog';
import Film from '../pages/Film';
import Home from '../pages/Home';
import Season from '../pages/Season';
import LazyLoadImageTesting from '../pages/TestSkeleton';

const Body = () => {
  return (
    <SkeletonTheme baseColor="#292841" highlightColor="#383753">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Catalog type="movie" />} />
        <Route path="/tv" element={<Catalog type="tv" />} />
        <Route path="/search" element={<Catalog type="search" />} />

        <Route path="/list/:listTitle" element={<Catalog type="list" />} />
        <Route path="/movie/:id" element={<Film mediaType="movie" />} />
        <Route path="/tv/:id" element={<Film mediaType="tv" />} />
        <Route path="/tv/:id/season/:seasonNumber" element={<Season />} />
        <Route path="/test" element={<LazyLoadImageTesting />} />
      </Routes>
    </SkeletonTheme>
  );
};

export default Body;
