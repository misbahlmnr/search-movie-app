import Slick, { Settings } from 'react-slick';
import { ReactNode, useState } from 'react';
import './slider.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props extends Omit<Settings, 'children'> {
  isMovieCard?: boolean;
  isSeasonCard?: boolean;
  children?: (onSwipe: boolean) => ReactNode;
}

type ButtonArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

function SampleNextArrow(props: ButtonArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <IoIosArrowForward color="white" className="w-5 h-5" />
    </div>
  );
}

function SamplePrevArrow(props: ButtonArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <IoIosArrowBack color="white" className="w-5 h-5" />
    </div>
  );
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
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
