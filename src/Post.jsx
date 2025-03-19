import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

const Post = ({ userImage, username, photo, date, tags, comments, onTagClick, onPostClick }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="post" onClick={() => onPostClick()}>
      <div className="user-info">
        <img style={{ width: '50px' }} src={userImage} alt={username} />
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <span>{username}</span>
          <span>{date}</span>
        </div>
      </div>
      <img src={photo} alt="Post" />
      <div className="post-actions">
        <button onClick={(e) => { e.stopPropagation(); handleLike(); }}>
          <FaHeart color={liked ? 'red' : 'black'} />
          <span>{likeCount}</span>
        </button>
        <FaComment />
      </div>
      <div className="post-details">
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} onClick={(e) => { e.stopPropagation(); onTagClick(tag); }} style={{ cursor: 'pointer', color: 'blue' }}>
              #{tag}
            </span>
          ))}
        </div>
        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
