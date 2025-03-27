import "./styles.css";

export const PostCard = ({ title, cover, body, id }) => (
  <div className="post">
    <img src={cover} alt={title}></img>
    <div className="post-cards">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
);
