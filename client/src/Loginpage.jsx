import React from "react";
import { useState } from "react";
import axios from 'axios';

const Loginpage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response=await axios.post('https://myblogs-7clj.onrender.com/login', {
                username: username,
                password: password
        },{withCredentials: true});
        if (response.status === 200) {
            window.location.href = '/';
            console.log(response.data);
        } else {
            alert('Login failed');
        }
    }

    return (
        <div className='flex flex-col items-center justify-start h-screen'>
            <h1 className='font-serif font-bold text-4xl pb-10'>Login</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username'
                    className='border-2 border-gray-400 p-2 rounded-md'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    className='border-2 border-gray-400 p-2 rounded-md'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='bg-blue-500 text-white p-2 rounded-md'>Login</button>
            </form>
        </div>
    );
}

export default Loginpage;
