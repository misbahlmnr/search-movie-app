import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from '../assets/img-404.jpg';
import { CustomComponentProps } from '../interfaces';
import { mergeClassName } from '../utils';

interface Props extends CustomComponentProps {
  src: string;
}

const Images = (props: Props) => {
  return (
    <div className={mergeClassName('bg-primary', props.className)}>
      <LazyLoadImage
        src={props.src}
        placeholderSrc={Image}
        className="object-cover w-full h-full"
        loading="lazy"
      />
    </div>
  );
};

export default Images;
