import { useState } from 'react';
import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Validate
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: email,
        signInTime: new Date().toLocaleString()
      }));

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="signin-container">
        <div className="success-animation">
          <div className="success-icon">✓</div>
          <h2>Sign In Successful!</h2>
          <p>Welcome back, {email.split('@')[0]}!</p>
          <p className="redirect-text">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        {/* Header */}
        <div className="signin-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to your FreshMart account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="signin-form">
          {/* Email Input */}
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="signin-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="signin-footer">
          <p>Don't have an account? <a href="#signup">Sign up here</a></p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="signin-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
}