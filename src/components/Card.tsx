import { MdPlayCircleFilled } from "react-icons/md";
import { CustomComponentProps } from "../interfaces";
import { mergeClassName } from "../utils";
import Images from "./images";

interface Props extends CustomComponentProps {
  imageSrc: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: Function;
  withPlay?: boolean;
  className?: string;
}

const Card = (props: Props) => {
  const withPlay = props.withPlay ?? true;
  return (
    <div
      onClick={() => (props.onClick ? props.onClick() : "")}
      className={mergeClassName(
        "group mx-3 my-2 cursor-pointer flex flex-col overflow-hidden",
        props.className
      )}
    >
      <div className="min-h-[250px] h-[250px] rounded-lg overflow-hidden relative mobile:min-h-[220px] mobile:h-[220px]">
        {withPlay && (
          <div className="hidden absolute group-hover:flex items-center justify-center left-0 right-0 top-0 bottom-0 bg-body/60">
            <MdPlayCircleFilled size={35} />
          </div>
        )}
        <Images src={props.imageSrc} className="w-full h-full" />
      </div>
      <p className="py-1.5 line-clamp-2 mb-5">{props.title}</p>
      {props.children}
    </div>
  );
};

export default Card;
