import { FaHeart, FaMapMarkerAlt, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="location-info">
            <FaMapMarkerAlt /> <span>Deliver to: Delhi</span>
          </div>
          <div className="top-links">
            <a href="#signin">Sign In</a>
            <a href="#help">Help</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🛒</div>
            <div className="logo-text">
              <div className="logo-main">FreshMart</div>
              <div className="logo-sub">Premium Groceries</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search fresh vegetables, fruits, dairy..." 
              className="search-box"
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Right Icons */}
          <div className="navbar-icons">
            <div className="icon-item">
              <FaHeart className="icon" />
              <span className="icon-label">Wishlist</span>
            </div>
            <Link to="/signin" className="icon-item">
              <FaUser className="icon" />
              <span className="icon-label">Account</span>
            </Link>
            <Link to="/cart" className="icon-item cart-icon">
              <FaShoppingCart className="icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              <span className="icon-label">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}