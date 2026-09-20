import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
const CommentList=({ comments, onDelete })=> {
  const { user }=useAuth();
  if (comments.length === 0) {
    return <p className="empty-state">No comments yet — be the first to respond.</p>;
  }
  return (
    <ul className="comment-list">
      {comments.map((comment)=> (
        <li key={comment._id} className="comment-item">
          <div className="comment-header">
            <div className="comment-author">
              <Avatar name={comment.author?.name} />
              <strong>{comment.author?.name || 'Unknown user'}</strong>
            </div>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p>{comment.content}</p>
          {user && user.id === comment.author?._id && (
            <button onClick={()=> onDelete(comment._id)} className="btn-link">
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
export default CommentList;
