// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Layout from '@/components/Layout';
import ImageGrid from '@/components/profileComponents/ImageGrid';
import ProfileHeader from '@/components/profileComponents/ProfileHeader';
import { fetchSpecificUser } from '@/redux/slices/authSlice';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { specificUserData } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);

  const loggedInUser = userData ? userData.user : null;

  const [userId, setUserId] = useState(null); // State to hold userId

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('userId');
    setUserId(id); // Set the userId state
    console.log('URL User ID:', id); // Check the userId from the URL

    const storedToken = localStorage.getItem('token');
    if (storedToken && id) {
      dispatch(fetchSpecificUser({ token: storedToken, userId: id })).finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
    } else {
      console.log('Something went wrong or no token/userId');
      setLoading(false); // Ensure loading is set to false in case of no token or userId
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log('User Data from Redux:', specificUserData); // Check userData after fetch
  }, [specificUserData]); // Log userData whenever it updates

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading indicator
  }

  return (
    <Layout>
      <div className="max-w-[900px] flex justify-center shadow-lg bg-white min-h-[100vh]">
        <div className="w-full">
          {specificUserData ? (
            <>
              <ProfileHeader 
                userData={specificUserData} // Pass the fetched user data here
                loggedInUserId={loggedInUser ? loggedInUser._id : null} // Check if loggedInUser is not null
                urlUserId={userId} 
              />
              <ImageGrid posts={specificUserData.user.posts} /> {/* Pass posts to ImageGrid */}
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
