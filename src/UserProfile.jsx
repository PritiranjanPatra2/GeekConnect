// UserProfile.jsx
import React from 'react';
import Post from './Post';

const UserProfile = ({ user, posts, onTagClick, onPostClick, onBackClick }) => {
  const userPosts = posts.filter(post => post.author === user.username);

  return (
    <div className="user-profile" style={{width:'300px',margin:'auto'}}>
      <button onClick={onBackClick} style={{ margin: '20px auto', width:'100px',border: 'none', color: 'blue', cursor: 'pointer' }}>
        Back to Feed
      </button>
      
      <div style={{ display: 'flex', width: '400px', alignItems: 'center', margin: '20px auto', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <img 
          src={user.userImage} 
          alt={user.username} 
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} 
        />
        <div>
          <h2>{user.username}</h2>
          <p>Date of Birth: {user.dob || 'Not specified'}</p>
          <p>Member since 2021</p>
          <p>Posts: {userPosts.length}</p>
        </div>
      </div>

      <div className="user-posts">
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <Post
              key={post.id}
              userImage={post.userImage}
              username={post.author}
              photo={post.download_url}
              date="March 19, 2025"
              tags={post.tags}
              comments={post.comments}
              onTagClick={onTagClick}
              onPostClick={() => onPostClick(post)}
            />
          ))
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;