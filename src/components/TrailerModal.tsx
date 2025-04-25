import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { mergeClassName } from '../utils';
import Container from './Container';

interface Props {
  src: string | null;
  onHide: () => void;
}

const TrailerModal = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const hide = () => {
    setShow(false);
    props.onHide();
  };

  useEffect(() => {
    if (props.src) setShow(true);
  }, [props.src]);

  const ModalWraperCss = show ? 'fixed' : 'hidden';

  return (
    <div
      onClick={() => hide()}
      className={mergeClassName(
        'z-[100] top-0 bottom-0 left-0 bg-body/50 w-full h-full',
        ModalWraperCss
      )}
    >
      <Container className="relative z-[110]m-auto w-[100%] h-[100%] flex items-center justify-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-header rounded-lg mobile:w-full overflow-hidden p-2 w-[500px] h-[500px] flex flex-col"
        >
          <div className="p-3 text-right">
            <button
              onClick={() => hide()}
              className="rounded-full hover:cursor-pointer hover:bg-slate-800"
            >
              <IoIosClose size={30} />
            </button>
          </div>
          <div className="w-full h-full">
            <iframe
              src={props.src as string}
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrailerModal;
