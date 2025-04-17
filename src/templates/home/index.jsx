import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts/index.jsx';
import { loadPosts } from '../../utils/load-posts.js';
import { Button } from '../../components/Button/index.jsx';
import { TextInput } from '../../components/Input/index.jsx';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filterPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="input-container">
        <TextInput handleChange={handleChange} searchValue={searchValue} />
      </div>

      {filterPosts.length > 0 && <Posts posts={filterPosts} />}

      {filterPosts.length === 0 && <p>Post não encontrato = P</p>}

      <div className="button-container">
        {!searchValue && <Button text="Carregar mais posts" onClick={loadMorePosts} disable={noMorePosts} />}
      </div>
    </section>
  );
};

export default Home;
