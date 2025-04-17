import P from 'prop-types';
import './style.css';

export const Button = ({ text, onClick, disable }) => (
  <button className="button" disabled={disable} onClick={onClick}>
    {text}
  </button>
);

Button.defaultProps = {
  disable: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disable: P.bool,
};
