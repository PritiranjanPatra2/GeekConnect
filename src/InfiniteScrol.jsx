import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Post from './Post';

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagLoading, setTagLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      const updatedPosts = response.data.map(post => ({
        ...post,
        userImage: `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}`,
        tags: generateTags(post.author),
      }));
      setPosts(prevPosts => [...prevPosts, ...updatedPosts]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const generateTags = (author) => {
    const keywords = ['nature', 'art', 'people', 'travel', 'landscape', 'abstract'];
    const randomIndex = Math.floor(Math.random() * keywords.length);
    return [author.split(' ')[0], keywords[randomIndex]];
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setTagLoading(true);
    setTimeout(() => {
      setTagLoading(false);
    }, 500);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setSelectedTag(null);
    setSelectedPost(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <div>
      <div ref={topRef}></div>

      {(selectedPost || selectedTag) && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button onClick={handleShowAll}>Show All</button>
        </div>
      )}

      {selectedTag && (
        <div style={{ textAlign: 'center', fontSize: '18px', margin: '10px 0', fontWeight: 'bold' }}>
          Showing results for <span style={{ color: 'blue' }}>#{selectedTag}</span>
        </div>
      )}

      {selectedPost ? (
        <Post
          key={selectedPost.id}
          userImage={selectedPost.userImage}
          username={selectedPost.author}
          photo={selectedPost.download_url}
          date="March 19, 2025"
          tags={selectedPost.tags}
          comments={['Amazing!', 'Looks great!']}
          onTagClick={handleTagClick}
          onPostClick={() => handlePostClick(selectedPost)}
        />
      ) : tagLoading ? (
        <div style={{ textAlign: 'center', fontSize: '18px', margin: '20px 0' }}>Loading...</div>
      ) : (
        filteredPosts.map(post => (
          <Post
            key={post.id}
            userImage={post.userImage}
            username={post.author}
            photo={post.download_url}
            date="March 19, 2025"
            tags={post.tags}
            comments={['Amazing!', 'Looks great!']}
            onTagClick={handleTagClick}
            onPostClick={() => handlePostClick(post)}
          />
        ))
      )}

      {/* Show "Load More" button if there are posts */}
      {!selectedTag && !selectedPost && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          {loading ? (
            <div style={{ fontSize: '18px' }}>Loading...</div>
          ) : (
            <button onClick={handleLoadMore} style={{border:"none", color:'blue',padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Load More ...
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
