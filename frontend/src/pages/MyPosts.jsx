import { useEffect, useState } from 'react';
import apiClient from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
const MyPosts=()=> {
  const { user }=useAuth();
  const [posts, setPosts]=useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState('');
  useEffect(()=> {
    const loadMyPosts=async ()=> {
      try {
        const response=await apiClient.get('/posts');
        const myPosts=response.data.filter((post)=> post.author?._id === user.id);
        setPosts(myPosts);
      } catch (fetchError) {
        setError('Could not load your posts.');
      } finally {
        setIsLoading(false);
      }
    };
    loadMyPosts();
  }, [user]);
  if (isLoading) return <p className="loading-state">Loading your posts...</p>;
  if (error) return <p className="error-state">{error}</p>;
  return (
    <div className="page">
      <p className="page-kicker">Your byline</p>
      <h1>My posts</h1>
      {posts.length === 0 ? (
        <p className="empty-state">You haven't published anything yet — start writing.</p>
      ) : (
        <div className="post-list">
          {posts.map((post)=> (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MyPosts;
