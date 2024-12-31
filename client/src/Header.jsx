import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        })
        if (response.status === 200) {
          const userInfo = response.data;
          console.log(userInfo);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, [setUserInfo]);

  function handleLogout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    }).catch(error => {
      console.error("Logout error:", error);
    });
  }

  const username = userInfo?.username;

  return (
    <header className="flex flex-row justify-between gap-5 pb-8">
      <Link to="/" className="text-4xl font-bold text-black">MyBlog</Link>
      <nav>
        {username ? (
          <div className="flex flex-row justify-between gap-3 pt-3">
            <Link to="/create" className="cursor-pointer transition-transform hover:scale-105 ">Create new post</Link>
            <button onClick={handleLogout} className="cursor-pointer transition-transform hover:scale-105">Logout ({username})</button>
          </div>
        ) : (
          <div className="flex flex-row justify-between gap-3 pt-3">
            <Link to="/login" className="cursor-pointer transition-transform hover:scale-105 pr-3">Login</Link>
            <Link to="/register" className="cursor-pointer transition-transform hover:scale-105 pr-3">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
