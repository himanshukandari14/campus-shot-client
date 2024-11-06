//@ts-nocheck

import Layout from '@/components/Layout';
import ImageGrid from '@/components/profileComponents/ImageGrid';
import ProfileHeader from '@/components/profileComponents/ProfileHeader';
import { fetchUserData } from '@/redux/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// overriding
const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(null); // State to hold userId

  useEffect(() => {
    // Extract userId from the query parameters
    const query = new URLSearchParams(window.location.search);
    const id = query.get('userId');
    setUserId(id); // Set the userId state
    console.log(id, 'url user'); // Log the userId from the query

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

  return (
    <Layout>
      <div className="max-w-[900px] flex justify-center shadow-lg bg-white min-h-[100px]">
        <div className="w-full">
          {userData ? (
            <>
              <ProfileHeader userData={userData} loggedInUserId={userData.user._id} urlUserId={userId} />
              <ImageGrid />
            </>
          ) : (
            <div className="text-center">No user data available.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
