import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../axiosinstance'; 
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import './writing.css'

// This is the writing landing page, which contains all of the blogs with the first 100 words of the body text.
// The user can then click on the title of each blog and they are then taken to the post detail page
const WritingLandingPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      const response = await AxiosInstance.get('/writing/');
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error('Error fetching data: Response is undefined or status is not 200');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);
  
  // Sort posts by 'created_on' date, with newest at the top
  // The sortedPosts variable uses the Array.sort() method to sort the posts array by the created_on date in ascending order (oldest first).
  // new Date(a.created_on): Converts the created_on string into a JavaScript Date object for comparison.
  // Ascending Order: Subtracts a.created_on from b.created_on. To reverse the order, you could subtract b.created_on from a.created_on.
  const sortedPosts = [...posts].sort((a, b) => new Date(b.created_on) - new Date(a.created_on));

  // Function to handle post click
  const handlePostClick = (postId) => {
    navigate(`/writing/${postId}`); // Redirect to the detailed view of the post
  };

  return (
    <div>
      <h1 className='landing-page-heading'>Writing</h1>
      {sortedPosts.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {sortedPosts.map((post) => (
            <div className="writing-block" key={post.id}>
              <h2 className='writing-title' style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post.id)}>
                {post.title}
              </h2>
              <p>Publication date: {new Date(post.publication_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              })}</p>
              <p>Created on: {new Date(post.created_on).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              })}</p>
              <p>
                {post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingLandingPage;

// import React, { useState, useEffect } from 'react';
// import AxiosInstance from '../../axiosinstance'; 
// import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
// import './writing.css'

// const WritingLandingPage = () => {
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   const getPostData = async () => {
//     try {
//       const response = await AxiosInstance.get('/writing/');
//       console.log('Fetched response:', response.data);
//       if (response.data && response.data.posts && Array.isArray(response.data.posts)) {
//         const postsWithValidBody = response.data.posts.map(post => ({
//           ...post,
//           body: post.body || '', // Provide a fallback for 'body' if it's undefined
//         }));
//         setPosts(postsWithValidBody);
//       } else {
//         console.error('Error: The posts data is not an array or is missing.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//     }
//   };
  

//   useEffect(() => {
//     getPostData();
//   }, []);
  
//   // Sort posts by 'created_on' date, with newest at the top
//   const sortedPosts = [...posts].sort((a, b) => new Date(b.created_on) - new Date(a.created_on));

//   // Function to handle post click
//   const handlePostClick = (postId) => {
//     navigate(`/writing/${postId}`); // Redirect to the detailed view of the post
//   };

//   return (
//     <div>
//       <h1 className='landing-page-heading'>Writing</h1>
//       {sortedPosts.length === 0 ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {sortedPosts.map((post) => (
//             <div className="writing-block" key={post.id}>
//               <h2 className='writing-title' style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post.id)}>
//                 {post.title}
//               </h2>
//               <p>Publication date: {new Date(post.publication_date).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: 'long',
//               year: 'numeric',
//               })}</p>
//               <p>Created on: {new Date(post.created_on).toLocaleDateString('en-GB', {
//               day: '2-digit',
//               month: 'long',
//               year: 'numeric',
//               })}</p>
//               <p>
//                 {post.body && post.body.length > 100 
//                   ? `${post.body.substring(0, 100)}...` 
//                   : post.body || 'No content available'}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WritingLandingPage;
