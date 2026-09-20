import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar=()=> {
  const { user, logout }=useAuth();
  const navigate=useNavigate();
  const handleLogout=()=> {
    logout();
    navigate('/');
  };
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link to="/" className="masthead-brand">
          The Blog Platform
        </Link>
        <nav className="masthead-nav">
          {user ? (
            <>
              <Link to="/create-post">Write</Link>
              <Link to="/my-posts">My posts</Link>
              <span className="masthead-username">{user.name}</span>
              <button onClick={handleLogout} className="btn-link">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
