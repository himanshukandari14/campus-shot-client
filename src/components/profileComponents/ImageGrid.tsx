import React from 'react';

const ImageGrid = ({ posts }) => {
  console.log(posts,'ye hai post')
  if (!posts) {
    return <div className="text-center w-full">No posts available.</div>;
  }

  return (
    <div className="flex flex-wrap justify-start">
      {posts && posts.length > 0 ? (
        posts.slice().reverse().map((post, index) => (
          post?.media ? (  // Ensure media exists in each post
            <div key={index} className="overflow-hidden shadow-md h-[281px] w-[281px] m-2">
              <img 
                src={post?.media} // Assuming each post object has a media field for images
                alt={`Post ${index}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : null
        ))
      ) : (
        <div className="text-center w-full">No posts available.</div>
      )}
    </div>
  );
};

export default ImageGrid;
