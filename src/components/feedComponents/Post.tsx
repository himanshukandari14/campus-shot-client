// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Heart, Heart as FilledHeart, MessageCircle, Share2, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, deletePost, likePost } from '@/redux/slices/authSlice';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ imageUrl, username, title, likes: initialLikes, comments, createdAt, postId, onLikeUpdate, onDeleteUpdate, onCommentUpdate }) => {
  const { userData } = useSelector((state) => state.auth);
  const loggedInUserId = userData?.user?._id;
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const hasLiked = likes.includes(loggedInUserId);

  useEffect(() => {
    setLikes(initialLikes);
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
          
        setLikes(newLikes);
        onLikeUpdate(postId, loggedInUserId, !hasLiked);
      }
    } catch (error) {
      setError("Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);

    try {
      const storedToken = await localStorage.getItem("token");
      if (!storedToken) {
        setError("Please log in to delete posts");
        return;
      }
      const resultAction = await dispatch(deletePost({ postId, token: storedToken }));
      if (deletePost.fulfilled.match(resultAction)) {
        onDeleteUpdate(postId);
      }
    } catch (error) {
      setError("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCommentToggle = () => {
    setShowCommentBox((prev) => !prev);
  };

 const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const storedToken = await localStorage.getItem("token");
        if (!storedToken) {
            setError("Please log in to comment on posts");
            return;
        }

        // Dispatch the action to create a comment
        const resultAction = await dispatch(createComment({ postId, token: storedToken, comment: newComment }));
        
        if (createComment.fulfilled.match(resultAction)) {
        const newComments = [...comments, { user: loggedInUserId, text: newComment }];
        setComments(newComments);
        onCommentUpdate(postId, newComments);  // Call the comment update handler
      }
    } catch (error) {
        setError("Failed to post comment");
    }finally{
      setShowCommentBox(false);
      setNewComment('')
    }
};


  return (
    <div className="w-full max-w-3xl mx-auto mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Post Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img src="/api/placeholder/60/60" alt={username} className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-start lowercase">{username}</h2>
              <h2 className="text-left text-sm text-gray-500">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </h2>
            </div>
          </div>
          
          {/* Conditionally Render Delete Button */}
          {userData?.user?.username === username && (
            <button
              onClick={handleDelete}
              className="text-gray-700 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          )}
        </div>
        
        {/* Post Body */}
        <p className="mt-4 text-base text-gray-700">{title}</p>
        <div className="mt-4">
          <img
            src={imageUrl || "/api/placeholder/1000/800"}
            alt="Post content"
            className="w-full md:h-[38rem] h-[20rem] object-cover rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center gap-2 text-gray-700 hover:text-red-500">
              {hasLiked ? (
                <FilledHeart className="text-red-500 fill-red-500" />
              ) : (
                <Heart />
              )}
              <span className="text-2xl">{likes.length}</span>
            </button>
            <button onClick={handleCommentToggle} className="text-gray-700 flex items-center gap-2 hover:text-blue-500">
              <MessageCircle className="w-6 h-6" />
              <span className="text-2xl">{comments.length}</span>
            </button>
            <button className="text-gray-700 flex items-center gap-2 hover:text-green-500">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Comment Box */}
        {showCommentBox && (
          <div className="mt-4">
            <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                rows="3"
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                className="self-end px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
              >
                Post Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
