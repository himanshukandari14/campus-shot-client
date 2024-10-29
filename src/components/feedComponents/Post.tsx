//@ts-nocheck
import { Heart, Heart as FilledHeart, MessageCircle, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '@/redux/slices/authSlice';
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ imageUrl, username, title, likes: initialLikes, comments, createdAt, postId, onLikeUpdate }) => {
  const { userData } = useSelector((state) => state.auth);
  const loggedInUserId = userData?.user?._id;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(initialLikes); // Local likes state for real-time updates
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState(null);
  const hasLiked = likes.includes(loggedInUserId);

  useEffect(() => {
    setLikes(initialLikes); // Update likes if the prop changes
  }, [initialLikes]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setError(null);
    
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setError("Please log in to like posts");
        return;
      }

      const resultAction = await dispatch(likePost({ postId, token: storedToken }));
      if (likePost.fulfilled.match(resultAction)) {
        const newLikes = hasLiked
          ? likes.filter((id) => id !== loggedInUserId)
          : [...likes, loggedInUserId];
          
        setLikes(newLikes); // Update local likes state immediately
        onLikeUpdate(postId, loggedInUserId, !hasLiked);
      }
    } catch (error) {
      setError("Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Post Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img src="/api/placeholder/60/60" alt={username} className="w-12 h-12 rounded-full" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-start lowercase">{username}</h2>
            <h2 className='text-left'>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</h2>
          </div>
        </div>

        {/* Post Body */}
        <p className="mt-4 text-base text-gray-700">{title}</p>
        <div className="mt-4">
          <img src={imageUrl || "/api/placeholder/1000/800"} alt="Post content" className="w-full md:h-[38rem] h-[20rem] object-cover" />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-4">
          <button onClick={handleLike} className="flex items-center gap-2">
            {hasLiked ? (
              <FilledHeart className="text-red-500 fill-red-500" />
            ) : (
              <Heart className="text-gray-700" />
            )}
            <span className="text-2xl">{likes.length}</span>
          </button>
          <button className="text-gray-700 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            <span className="text-2xl">{comments.length}</span>
          </button>
          <button className="text-gray-700 flex items-center gap-2">
            <Share2 className="w-6 h-6" />
            <span className="text-2xl">{comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
