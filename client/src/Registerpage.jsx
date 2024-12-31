import React, { useState } from "react";
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };
  async function handleRegister(event) {
    event.preventDefault();
    const response= await axios.post("https://myblogs-7clj.onrender.com/register", {
            username: username,
            password: password,
    });
    if(response.status === 200){
        alert("Register Success");
        window.location.href = '/login';
    }else{
        alert("Register Failed");
    }
    
  }

  return (
    <div className='flex flex-col items-center justify-start h-screen'>
      <div className=''>
        <h1 className='text-3xl font-semibold mb-6 text-center'>Register</h1>
        <form className='flex flex-col gap-4'
        onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className='border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            className='border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500'
          />
          <input
            type="password"
            placeholder='Retype Password'
            value={retypePassword}
            onChange={handleRetypePasswordChange}
            className={`border-2 p-2 rounded-md focus:outline-none ${
              passwordMatch ? "border-gray-300" : "border-red-500"
            } focus:border-blue-500`}
          />
          {!passwordMatch && (
            <p className='text-red-500'>Passwords do not match.</p>
          )}
          <button
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Register
          </button>
          <p className='text-center'>
            "password is encrypted before sending to server"
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
