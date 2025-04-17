import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1 ',
      cover: 'img/img.png',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img.png',
    },
  ],
};

describe('<Posts />', () => {
  it('should render post', () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(2);
    expect(screen.getAllByText(/body/i)).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: /title 2/i })[0]).toHaveAttribute('src', props.posts[0].cover);
  });

  it('should not render posts', () => {
    render(<Posts />);
    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
