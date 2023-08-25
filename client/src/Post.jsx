import React from "react";
import { formatISO9075 } from 'date-fns';
import { Link } from "react-router-dom";
import arrow from './right-arrow.png'

const Post = ({_id,title,summary,content,cover,createdAt,author}) => {
    return (
        <div className='glassmorphism'>
        <div>
        </div>
        <div>
          <Link to={`/post/${_id}`}>
        <h2 className='font-serif font-bold text-2xl pt-4 pl-4 '>{title}</h2>
        </Link>
        <p className='font-sans text-lg pt-4 text-left  pl-5'><span className="font-bold">Published</span>: {formatISO9075(new Date(createdAt))}</p>
        <p className='font-sans text-md mx-auto w-[90%] pt-3'>{summary}</p>
        
        <div className="flex flex-row justify-evenly ">
          <div>
        <p className='font-sans text-lg pt-4'>Author: <span className='font-bold'>{author.username}</span></p>
        <Link to={`/post/${_id}`} className='font-sans text-lg pt-4 text-blue-500 '>Read More</Link>
        </div>
        <Link to={`/post/${_id}`}
        className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-transparent border-[1px] border-white "
      >
        <img
          src={arrow}
          alt="arrow"
          className="w-[40%] h-[40%] object-contain"
        />
      </Link>
        
        </div>
        </div>
      </div>
        
    );
    }
 
export default Post;
