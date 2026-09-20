import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login=()=> {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('');
  const { login }=useAuth();
  const navigate=useNavigate();
  const handleSubmit=async (event)=> {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (loginError) {
      setError(loginError.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="page auth-page">
      <p className="page-kicker">Welcome back</p>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event)=> setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event)=> setPassword(event.target.value)}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};
export default Login;
