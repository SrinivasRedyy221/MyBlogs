import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from 'date-fns';
import {UserContext} from "./UserContext";
import { Link } from "react-router-dom";

function PostPage() {
  const [postInfo, setPostInfo] = useState(null); // Initialize with null
  const {userInfo} = useContext(UserContext);
  const { id } = useParams();
  
  useEffect(() => {
    fetch(`https://myblogs-7clj.onrender.com/posts/${id}`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
      setPostInfo(data);
    })
    .catch(error => {
      console.error("Error fetching post:", error);
      setPostInfo(null);
    });
  }, [id]); 

  if (!postInfo) {
    return <h1>Post not found</h1>;
  }

  const createdAtDate = new Date(postInfo.createdAt);
  const formattedDate = createdAtDate ? formatISO9075(createdAtDate) : "N/A";

  async function handleDelete(){
    const response = await fetch(`https://myblogs-7clj.onrender.com/posts/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    if(response.ok){
      console.log("Deleted")
    }
  }


  return (
    <div className="min-h-screen flex flex-col justify-start gap-5">
      <h1 className="text-4xl font-bold text-center">{postInfo.title}</h1>
      <div className="flex flex-row justify-evenly">
        <div>
        <time className="font-sans text-lg pt-4"><span className="font-bold text-">Published:</span> {formattedDate}</time>
        </div>
        <div>
        <h3 className=""><span className="font-bold">Author:</span>{postInfo.author.username}</h3>
        </div>
      </div>
      
      
      {userInfo._id === postInfo.author._id ?
        <div className="flex justify-center gap-5">
          <Link to={`/edit/${postInfo._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit this post
          </Link>
          <Link to={`/`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}>
            Delete
          </Link> 
      </div> : <div>Author can make the edits</div>}
      
      {/* <img src={`https://myblogs-7clj.onrender.com/${postInfo.cover}`} alt="Cover of the post" className='w-1/2 mx-auto' /> */}
      <h2 className="text-xl font-bold text-center">{postInfo.summary}</h2>

      <div className="text-center" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

export default PostPage;
