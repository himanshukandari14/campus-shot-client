// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPost, fetchUserData } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Post from '@/components/feedComponents/Post';
import Sidebar from '@/components/feedComponents/Sidebar';
import ShareComponent from '@/components/feedComponents/ShareComponent';
import Suggestions from '@/components/feedComponents/Suggestions';
import { TopNav } from '@/components/feedComponents/TopNav';
import LogoutButton from '@/components/LogoutButton ';



const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const { userData, posts, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (posts?.allPosts) {
      setPost(posts.allPosts);
    }
  }, [posts]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken,'check')
    
    

    if (storedToken) {
      dispatch(fetchUserData(storedToken));
      dispatch(fetchAllPost(storedToken));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  // Handler to update the likes in the feed
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


  // Function to remove the deleted post from the feed state
  const removePostFromFeed = (postId) => {
    setPost((prevPosts) => prevPosts.filter((p) => p._id !== postId));
  };

 

  // Function to update comments in the feed
  const updateCommentsInFeed = (postId, newComments) => {
    setPost((prevPosts) =>
      prevPosts.map((p) =>
        p._id === postId
          ? { ...p, comments: newComments }
          : p
      )
    );
  };
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!userData) return <div className="text-center">No user data available.</div>;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
   
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:fixed lg:left-0 lg:w-[20rem] h-screen">
          <Sidebar />
        </div>
      
        <div className="flex flex-col w-full">
          <div className="sticky top-0 z-30 lg:hidden">
            <TopNav />
          </div>

          <div className="w-full px-4 lg:px-0 mx-auto lg:ml-[calc(20rem+8%)] lg:mr-[calc(20rem+2%)]">
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
          </div>

          <div className="hidden lg:block lg:fixed lg:right-0 lg:top-0 h-screen w-[20rem] bg-red-500 p-4">
            <div className="h-full">
              <Suggestions />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="lg:ml-[calc(20rem+8%)] lg:mr-[calc(20rem+2%)] max-w-[600px] mx-auto px-4 py-3">
          <ShareComponent />
        </div>
      </div>
    </div>
  );
};

export default Feed;
