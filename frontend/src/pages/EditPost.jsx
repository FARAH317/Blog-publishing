import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosInstance';
const EditPost=()=> {
  const { id }=useParams();
  const navigate=useNavigate();
  const [title, setTitle]=useState('');
  const [content, setContent]=useState('');
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState('');
  useEffect(()=> {
    const loadPost=async ()=> {
      try {
        const response=await apiClient.get(`/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (fetchError) {
        setError('Could not load this post.');
      } finally {
        setIsLoading(false);
      }
    };
    loadPost();
  }, [id]);
  const handleSubmit=async (event)=> {
    event.preventDefault();
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    if (title.trim().length > 150) {
      setError('Title must be 150 characters or fewer');
      return;
    }
    if (content.trim().length < 10) {
      setError('Content must be at least 10 characters');
      return;
    }
    try {
      await apiClient.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Failed to update post');
    }
  };
  if (isLoading) return <p className="loading-state">Loading post...</p>;
  return (
    <div className="page">
      <p className="page-kicker">Draft</p>
      <h1>Edit post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event)=> setTitle(event.target.value)}
        />
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(event)=> setContent(event.target.value)}
          rows={10}
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default EditPost;
