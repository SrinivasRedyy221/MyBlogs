import Post from "./Post";
import { useEffect , useState } from "react";
import axios from "axios";
function IndexPage() {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
      axios.get('http://localhost:4000/posts', {
        withCredentials: true,
    })
    .then(response => {
        setPosts(response.data);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });


    },[]);
    return (
        <div className="min-h-screen">
            <h1 className='text-2xl font-bold text-center'>Posts</h1>
            <p className='text-center'>Welcome to the blog</p>
            <div className='flex flex-col gap-3 pt-5'>
                {posts.length > 0 && posts.map(post=><Post {...post}/>)}
            </div>
        </div>
    );
    }

export default IndexPage;