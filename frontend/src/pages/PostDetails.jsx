import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { getReadingTime } from '../utils/readingTime';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
const PostDetails=()=> {
  const { id }=useParams();
  const { user }=useAuth();
  const navigate=useNavigate();
  const [post, setPost]=useState(null);
  const [comments, setComments]=useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState('');
  const loadPostAndComments=async ()=> {
    setIsLoading(true);
    setError('');
    try {
      const [postResponse, commentsResponse]=await Promise.all([
        apiClient.get(`/posts/${id}`),
        apiClient.get(`/posts/${id}/comments`),
      ]);
      setPost(postResponse.data);
      setComments(commentsResponse.data);
    } catch (fetchError) {
      setError('Post not found.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=> {
    loadPostAndComments();
  }, [id]);
  const handleAddComment=async (content)=> {
    const response=await apiClient.post(`/posts/${id}/comments`, { content });
    setComments((previousComments)=> [...previousComments, response.data]);
  };
  const handleDeleteComment=async (commentId)=> {
    await apiClient.delete(`/comments/${commentId}`);
    setComments((previousComments)=>
      previousComments.filter((comment)=> comment._id !== commentId)
    );
  };
  const handleDeletePost=async ()=> {
    if (!window.confirm('Delete this post permanently?')) return;
    await apiClient.delete(`/posts/${id}`);
    navigate('/');
  };
  if (isLoading) return <p className="loading-state">Loading post...</p>;
  if (error) return <p className="error-state">{error}</p>;
  const isOwner=user && user.id === post.author?._id;
  return (
    <div className="page">
      <article className="post-details">
        <h1>{post.title}</h1>
        <div className="post-row-meta">
          <span>{post.author?.name || 'Unknown author'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{getReadingTime(post.content)}</span>
        </div>
        <p className="post-content">{post.content}</p>
        {isOwner && (
          <div className="post-actions">
            <Link to={`/posts/${id}/edit`}>Edit</Link>
            <button onClick={handleDeletePost} className="btn-link">
              Delete
            </button>
          </div>
        )}
      </article>
      <section className="comments-section">
        <h2>Comments</h2>
        {user ? (
          <CommentForm onSubmit={handleAddComment} />
        ) : (
          <p>
            <Link to="/login">Log in</Link> to leave a comment.
          </p>
        )}
        <CommentList comments={comments} onDelete={handleDeleteComment} />
      </section>
    </div>
  );
};
export default PostDetails;
