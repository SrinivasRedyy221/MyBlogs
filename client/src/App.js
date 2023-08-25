import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import Layout from './Layout';
import IndexPage from './IndexPage';
import Loginpage from './Loginpage';
import Registerpage from './Registerpage';
import CreatePost from './CreatePost';
import PostPage from './PostPage';
import EditPost from './EditPost';

function App() {
  return (
    <div className="App">
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<Registerpage />} />
          <Route path="create" element={<CreatePost/>} />
          <Route path="post/:id" element={<PostPage/>} />
          <Route path="edit/:id" element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
    </div>
  );
}

export default App;
