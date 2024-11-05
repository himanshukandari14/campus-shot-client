//@ts-nocheck

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPost, fetchUserData } from '@/redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Post from '@/components/feedComponents/Post';
import ShareComponent from '@/components/feedComponents/ShareComponent';


import Layout from '@/components/Layout'; // Import the layout

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { userData, posts, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (posts?.allPosts) {
      setPost(posts.allPosts);
    }
  }, [posts]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(fetchUserData(storedToken));
      dispatch(fetchAllPost(storedToken));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const updateLikeInFeed = (postId, userId, hasLiked) => {
    setPost((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId
          ? {
              ...p,
              likes: hasLiked
                ? [...p.likes, userId]
                : p.likes.filter((id) => id !== userId),
            }
          : p
      )
    );
  };

  const removePostFromFeed = (postId) => {
    setPost((prevPosts) => prevPosts.filter((p) => p._id !== postId));
  };

  const updateCommentsInFeed = (postId, newComments) => {
    setPost((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId ? { ...p, comments: newComments } : p
      )
    );
  };

  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!userData) return <div className="text-center">No user data available.</div>;

  return (
    <Layout>

      <div className="space-y-6 mb-20 max-w-[600px] pt-4">
        {post.slice().reverse().map((postItem, index) => (
          <Post
            key={index}
            postId={postItem._id}
            imageUrl={postItem?.media}
            username={postItem?.author?.username}
            title={postItem?.title}
            likes={postItem?.likes}
            comments={postItem?.comments}
            createdAt={postItem?.createdAt}
            onLikeUpdate={updateLikeInFeed}
            onDeleteUpdate={removePostFromFeed}
            onCommentUpdate={updateCommentsInFeed}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="lg:ml-[calc(20rem+8%)] lg:mr-[calc(20rem+2%)] max-w-[600px] mx-auto px-4 py-3">
          <ShareComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
