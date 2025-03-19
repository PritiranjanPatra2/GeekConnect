// InfiniteScroll.jsx (updated to pass onProfileClick)
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Post from './Post';
import UserProfile from './UserProfile';

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagLoading, setTagLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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
        dob: generateRandomDOB(),
        comments: generateRandomComments()
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

  const generateRandomDOB = () => {
    const year = Math.floor(Math.random() * (2000 - 1980 + 1)) + 1980;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const generateRandomComments = () => {
    const comments = ['Amazing!', 'Looks great!', 'Wow!', 'Beautiful!'];
    const usernames = ['john_doe', 'jane_smith', 'bob_jones', 'alice_w', 'mike_b'];
    
    return Array(2).fill().map(() => ({
      userId: Math.floor(Math.random() * 1000),
      username: usernames[Math.floor(Math.random() * usernames.length)],
      text: comments[Math.floor(Math.random() * comments.length)],
      userImage: `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}`
    }));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSelectedUser(null);
    setSelectedPost(null);
    setTagLoading(true);
    setTimeout(() => setTagLoading(false), 500);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setSelectedTag(null);
    setSelectedPost(null);
    setSelectedUser(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setSelectedUser(null);
    setSelectedTag(null);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProfileClick = (userIdOrPost, username) => {
    if (typeof userIdOrPost === 'number') { // Comment user clicked
      setSelectedUser({
        username: username,
        userImage: `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}`,
        dob: generateRandomDOB()
      });
    } else { // Post author clicked
      setSelectedUser({
        username: userIdOrPost.author,
        userImage: userIdOrPost.userImage,
        dob: userIdOrPost.dob
      });
    }
    setSelectedPost(null);
    setSelectedTag(null);
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

      {(selectedPost || selectedTag || selectedUser) && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button onClick={handleShowAll}>Show All</button>
        </div>
      )}

      {selectedUser ? (
        <UserProfile
          user={selectedUser}
          posts={posts}
          onTagClick={handleTagClick}
          onPostClick={handlePostClick}
          onBackClick={handleShowAll}
          onProfileClick={handleProfileClick} // Pass the handler
        />
      ) : selectedTag ? (
        <>
          <div style={{ textAlign: 'center', fontSize: '18px', margin: '10px 0', fontWeight: 'bold' }}>
            Showing results for <span style={{ color: 'blue' }}>#{selectedTag}</span>
          </div>
          {tagLoading ? (
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
                comments={post.comments}
                onTagClick={handleTagClick}
                onPostClick={() => handlePostClick(post)}
                onProfileClick={(userId, username) => handleProfileClick(userId || post, username || post.author)}
              />
            ))
          )}
        </>
      ) : selectedPost ? (
        <Post
          key={selectedPost.id}
          userImage={selectedPost.userImage}
          username={selectedPost.author}
          photo={selectedPost.download_url}
          date="March 19, 2025"
          tags={selectedPost.tags}
          comments={selectedPost.comments}
          onTagClick={handleTagClick}
          onPostClick={() => handlePostClick(selectedPost)}
          onProfileClick={(userId, username) => handleProfileClick(userId || selectedPost, username || selectedPost.author)}
        />
      ) : (
        filteredPosts.map(post => (
          <Post
            key={post.id}
            userImage={post.userImage}
            username={post.author}
            photo={post.download_url}
            date="March 19, 2025"
            tags={post.tags}
            comments={post.comments}
            onTagClick={handleTagClick}
            onPostClick={() => handlePostClick(post)}
            onProfileClick={(userId, username) => handleProfileClick(userId || post, username || post.author)}
          />
        ))
      )}

      {!selectedTag && !selectedPost && !selectedUser && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          {loading ? (
            <div style={{ fontSize: '18px' }}>Loading...</div>
          ) : (
            <button onClick={handleLoadMore} style={{ border: 'none', color: 'blue', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Load More ...
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;