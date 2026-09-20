import { Link } from 'react-router-dom';
import { getReadingTime } from '../utils/readingTime';
const PostCard=({ post, featured=false })=> {
  const excerptLength=featured ? 260 : 140;
  const excerpt=post.content.length > excerptLength
      ? `${post.content.slice(0, excerptLength)}...`
      : post.content;
  return (
    <article className={`post-row ${featured ? 'featured' : ''}`}>
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="post-row-excerpt">{excerpt}</p>
      <div className="post-row-meta">
        <span>{post.author?.name || 'Unknown author'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{getReadingTime(post.content)}</span>
      </div>
    </article>
  );
};
export default PostCard;
