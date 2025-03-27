import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts/index.jsx";
import { loadPosts } from "../../utils/load-posts.js";
import { Button } from "../../components/Button/index.jsx";
import { TextInput } from "../../components/Input/index.jsx";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filterPosts = !!searchValue
      ? allPosts.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : posts;

    return (
      <section className="container">
        <div className="input-container">
          <TextInput
            handleChange={this.handleChange}
            searchValue={searchValue}
          />
        </div>

        {filterPosts.length > 0 && <Posts posts={filterPosts} />}

        {filterPosts.length === 0 && <p>Post não encontrato = P</p>}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Carregar mais posts"
              onClick={this.loadMorePosts}
              disable={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
