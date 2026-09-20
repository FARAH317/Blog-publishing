import { useEffect, useState } from 'react';
import apiClient from '../api/axiosInstance';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
const Home=()=> {
  const [posts, setPosts]=useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [error, setError]=useState('');
  const fetchPosts=async (search='')=> {
    setIsLoading(true);
    setError('');
    try {
      const response=await apiClient.get('/posts', { params: search ? { search } : {} });
      setPosts(response.data);
    } catch (fetchError) {
      setError('Could not load posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=> {
    fetchPosts();
  }, []);
  if (isLoading) return <p className="loading-state">Loading posts...</p>;
  if (error) return <p className="error-state">{error}</p>;
  const [firstPost, ...remainingPosts]=posts;
  return (
    <div className="page">
      <p className="page-kicker">Latest from the community</p>
      <h1>Posts</h1>
      <SearchBar onSearch={fetchPosts} />
      {posts.length === 0 ? (
        <p className="empty-state">Nothing published yet — be the first to write something.</p>
      ) : (
        <div className="post-list">
          <PostCard post={firstPost} featured />
          {remainingPosts.map((post)=> (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
