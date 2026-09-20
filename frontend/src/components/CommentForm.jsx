import { useState } from 'react';
const CommentForm=({ onSubmit })=> {
  const [content, setContent]=useState('');
  const [error, setError]=useState('');
  const handleSubmit=async (event)=> {
    event.preventDefault();
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    setError('');
    await onSubmit(content);
    setContent('');
  };
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(event)=> setContent(event.target.value)}
        rows={3}
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Post Comment</button>
    </form>
  );
};
export default CommentForm;
