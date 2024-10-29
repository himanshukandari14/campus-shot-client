// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react';
import { Image, MapPin, Globe, XCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createPost, fetchAllPost } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ShareComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile({
        file: selectedFile,
        url: URL.createObjectURL(selectedFile),
        type: selectedFile.type.startsWith('image') ? 'image' : 'video',
      });
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleSend = async () => {
    setLoading(true);
    setError(null); // Reset error on new attempt

    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) throw new Error("Please log in to create a post");

      const media = file ? file.file : null;
      const resultAction = await dispatch(createPost({ title, media, token: storedToken }));
      console.log('haa')

      if (createPost.fulfilled.match(resultAction)) {
        console.log('Post created successfully');

        // Optionally fetch all posts again after creating a post
        dispatch(fetchAllPost(storedToken));
        
        // Redirect to the feed page
        navigate('/feed'); // Redirect to the feed page

        // Clear the input fields
        setTitle('');
        setFile(null);
      } else {
        setError(resultAction.payload || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[100%] rounded-3xl bg-[#F3F1F1] p-2 sm:p-3 border-t border-gray-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-gray-600">👤</span>
          </div>
          <input
            type="text"
            placeholder="Share something"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm sm:text-base"
          />
        </div>
        
        {/* Preview of selected file */}
        {file && (
          <div className="relative mb-3">
            {file.type === 'image' ? (
              <img src={file.url} alt="Preview" className="w-full max-h-60 object-cover rounded-lg" />
            ) : (
              <video src={file.url} controls className="w-full max-h-60 rounded-lg" />
            )}
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-500 hover:text-gray-800"
            >
              <XCircle size={20} />
            </button>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
            <label className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
              <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Image/Video</span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            
            <button className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Location</span>
            </button>
          </div>
          
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Public</span>
            </button>
            
            <button onClick={handleSend} className="px-3 sm:px-4 py-1 bg-black text-white rounded-full text-xs sm:text-sm hover:bg-gray-800 transition-colors">
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareComponent;
