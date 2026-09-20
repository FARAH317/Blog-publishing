import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosInstance';
const CreatePost=()=> {
  const [title, setTitle]=useState('');
  const [content, setContent]=useState('');
  const [error, setError]=useState('');
  const navigate=useNavigate();
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
      const response=await apiClient.post('/posts', { title, content });
      navigate(`/posts/${response.data._id}`);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Failed to create post');
    }
  };
  return (
    <div className="page">
      <p className="page-kicker">Draft</p>
      <h1>Write a new post</h1>
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
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};
export default CreatePost;
