import Post from "./Post";
import { useEffect , useState } from "react";
function IndexPage() {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/posts',{
            method:'GET',
            credentials:'include'
        }).then(res=>res.json()).then(data=>{
            setPosts(data);
        }
        );


    },[]);
    return (
        <div className="">
            <h1 className='text-2xl font-bold text-center'>Posts</h1>
            <p className='text-center'>Welcome to the blog</p>
            <div className='flex flex-col gap-3 pt-5'>
                {posts.length > 0 && posts.map(post=><Post {...post}/>)}
            </div>
        </div>
    );
    }

export default IndexPage;