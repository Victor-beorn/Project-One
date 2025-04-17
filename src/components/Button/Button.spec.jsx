import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button/>', () => {
  it('should render the button with the text', () => {
    render(<Button text="Carregar mais posts" />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" onClick={fn} />);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disable when disable is true', () => {
    render(<Button text="Carregar mais posts" disable={true} />);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });

    expect(button).toBeDisabled();
  });

  it('should match snapshot', () => {
    const { container } = render(<Button text="Carregar mais posts" disable={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
