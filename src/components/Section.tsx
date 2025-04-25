import { CustomComponentProps } from '../interfaces';
import { mergeClassName } from '../utils';
import Container from './Container';

interface Props extends CustomComponentProps {
  title?: string;
  onTitleClick?: () => void;
}

const Section = (props: Props) => {
  return (
    <Container className={props.className}>
      {props.title && (
        <h1
          onClick={props.onTitleClick}
          className={mergeClassName(
            'text-slate-100 text-2xl px-3 py-1.5 font-bold',
            props.onTitleClick ? 'cursor-pointer hover:text-white' : ''
          )}
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
      )}
      {props.children}
    </Container>
  );
};

export default Section;
