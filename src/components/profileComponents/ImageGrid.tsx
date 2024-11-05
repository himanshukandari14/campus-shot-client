// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { fetchUserData } from '@/redux/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ImageGrid = () => {


   const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(fetchUserData(storedToken)).finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
    } else {
      console.log('Something went wrong');
      setLoading(false); // Ensure loading is set to false in case of no token
    }
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading indicator
  }

const posts= userData?.user?.posts;
const image =userData?.user?.posts?.media;
console.log(image)

  return (
     <div className="flex flex-wrap justify-start">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="overflow-hidden shadow-md h-[300px] w-[300px] m-2">
            <img 
              src={post?.media} // Assuming each post object has an imageUrl field
              alt={`Post ${index}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))
      ) : (
        <div className="text-center w-full">No posts available.</div>
      )}
    </div>
  );
}

export default ImageGrid;
