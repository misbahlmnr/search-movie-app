import { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "../layout/Body";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { getGenreData } from "../services/api/actions";
import { StoreContext } from "../services/context";
import { Loading } from "./loading";

const AppContainer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { genres } = state;

  useEffect(() => {
    getGenreData(dispatch);
  }, []);

  if (!genres.movie.length || !genres.tv.length) {
    return (
      <div className="fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Router>
      <div className="pb-[64px] font-manrope tracking-wide">
        {/* header */}
        <Header />
        {/* body */}
        <Body />
        {/* footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default AppContainer;
