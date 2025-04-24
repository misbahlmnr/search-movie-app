import Slick, { Settings } from 'react-slick';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import { ReactNode, useState } from 'react';
import './slider.css';

interface Props extends Omit<Settings, 'children'> {
  isMovieCard?: boolean;
  isSeasonCard?: boolean;
  children?: (onSwipe: boolean) => ReactNode;
}

const Slider = (props: Props) => {
  let settings: Omit<Settings, 'children'> = {
    ...props,
  };

  if (props.isMovieCard) {
    settings = {
      ...settings,
      autoplay: false,
      infinite: false,
      slidesToShow: 6,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToScroll: 3,
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToScroll: 2,
            slidesToShow: 2,
          },
        },
      ],
    };
  }

  const [onSwipe, setOnSwipe] = useState(false);

  return (
    <Slick
      {...settings}
      autoplaySpeed={5000}
      swipeEvent={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
      adaptiveHeight
    >
      {props.children ? props.children(onSwipe) : ''}
    </Slick>
  );
};

export default Slider;
