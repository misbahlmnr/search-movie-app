import { CustomComponentProps } from "../interfaces";
import { mergeClassName } from "../utils";

const Container = (props: CustomComponentProps) => {
  return (
    <div
      className={mergeClassName(
        "px-1 py-3 max-w-screen-xl mx-auto mobile:px-4",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
