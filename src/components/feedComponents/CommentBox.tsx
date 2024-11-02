// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { fetchOnePostComments } from '@/redux/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentBox = ({ postId }) => { // Accept postId as a prop
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
 const comments = useSelector((state) => state.auth.comments); // Accessing from the auth slice
 console.log(comments)


  useEffect(() => {
    console.log('cmt')
    dispatch(fetchOnePostComments(postId)); // Fetch comments for the specific post
  }, [dispatch, postId]); // Only run effect when postId changes

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Optionally dispatch an action to add a new comment
      // dispatch(addComment({ postId, text: comment }));
      setComment(''); // Clear the input
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Comments</h2>
      {loading && <p>Loading comments...</p>} {/* Show loading text */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}
      <div className="mt-4 space-y-2">
       {comments && comments.length > 0 ? (
  comments.map((comment, index) => (
    <div key={index} className="p-3 bg-gray-100 rounded-md text-gray-800 border border-gray-200">
      {comment.text} {/* Ensure this matches your comment structure */}
    </div>
  ))
) : (
  <p>No comments yet.</p>
)}

      </div>
      <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3 mt-4">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          rows="3"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="self-end px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
