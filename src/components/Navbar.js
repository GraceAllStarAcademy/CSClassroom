import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/showcase">Student Showcase</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/portal">Parent Portal</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
