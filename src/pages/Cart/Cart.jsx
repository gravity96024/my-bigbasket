import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/cartSlice';
import '../../styles/Cart.css';

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some fresh products to get started</p>
          <Link to="/" className="continue-shopping-btn">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>

          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items-container">
              <div className="items-header">
                <h2>Items ({cartItems.length})</h2>
                <p className="item-count-text">{cartItems.length} items in cart</p>
              </div>

              <div className="items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-description">{item.description}</p>
                      <p className="cart-item-unit-price">₹{item.price} per unit</p>
                    </div>

                    <div className="cart-item-quantity">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="qty-btn"
                        title="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="qty-btn"
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      <p className="total-price">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="delete-btn"
                        title="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span className="delivery-fee">₹30</span>
                </div>
                <div className="summary-row">
                  <span>Tax (5%)</span>
                  <span>₹{Math.round(totalPrice * 0.05)}</span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalPrice + 30 + Math.round(totalPrice * 0.05)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>

              <Link to="/" className="continue-btn">
                Continue Shopping
              </Link>

              <div className="savings-info">
                <p>💚 You're saving ₹{cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0)} with discounts!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}