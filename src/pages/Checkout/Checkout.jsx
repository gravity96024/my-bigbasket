import { useState } from 'react';
import { FaCheckCircle, FaCreditCard, FaQrcode, FaTruck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { clearCart } from '../../store/cartSlice';
import '../../styles/Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  const [step, setStep] = useState(1); // 1: Cart Review, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + tax;

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div>
        <Navbar />
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      const orderId = 'FM' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderDetails({
        orderId: orderId,
        paymentMethod: paymentMethod,
        totalAmount: finalTotal,
        itemCount: cartItems.length,
        estimatedDelivery: '30-45 minutes'
      });

      setStep(3);

      // Clear cart
      dispatch(clearCart());

      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push({
        orderId,
        paymentMethod,
        totalAmount: finalTotal,
        itemCount: cartItems.length,
        date: new Date().toLocaleString()
      });
      localStorage.setItem('orders', JSON.stringify(orders));
    }, 2500);
  };

  // STEP 1: CART REVIEW
  if (step === 1) {
    return (
      <div>
        <Navbar />
        <div className="checkout-page">
          <div className="checkout-container">
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-step active">
                <span className="step-number">1</span>
                <span className="step-label">Cart Review</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step">
                <span className="step-number">2</span>
                <span className="step-label">Payment</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step">
                <span className="step-number">3</span>
                <span className="step-label">Confirmation</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="checkout-content">
              <div className="cart-items-section">
                <h2>Order Summary</h2>
                
                <div className="items-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="checkout-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className="item-price">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Delivery Fee</span>
                    <span className="delivery-fee">₹{deliveryFee}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="delivery-info-section">
                <h3>Delivery Information</h3>
                
                <div className="info-card">
                  <FaTruck className="info-icon" />
                  <div className="info-content">
                    <h4>Fast Delivery</h4>
                    <p>Estimated delivery time: 30-45 minutes</p>
                  </div>
                </div>

                <div className="address-form">
                  <h4>Delivery Address</h4>
                  <input type="text" placeholder="Enter street address" className="form-input" />
                  <div className="address-row">
                    <input type="text" placeholder="City" className="form-input" />
                    <input type="text" placeholder="Postal Code" className="form-input" />
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="proceed-btn"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: PAYMENT
  if (step === 2) {
    return (
      <div>
        <Navbar />
        <div className="checkout-page">
          <div className="checkout-container">
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress-step">
                <span className="step-number">1</span>
                <span className="step-label">Cart Review</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step active">
                <span className="step-number">2</span>
                <span className="step-label">Payment</span>
              </div>
              <div className="progress-line"></div>
              <div className="progress-step">
                <span className="step-number">3</span>
                <span className="step-label">Confirmation</span>
              </div>
            </div>

            <div className="checkout-content">
              {/* Payment Methods */}
              <div className="payment-section">
                <h2>Choose Payment Method</h2>

                {/* COD Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <input 
                    type="radio" 
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="radio-input"
                  />
                  <FaTruck className="payment-icon" />
                  <div className="payment-content">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when your order is delivered</p>
                  </div>
                </div>

                {/* QR Code Option */}
                <div 
                  className={`payment-option ${paymentMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <input 
                    type="radio"
                    name="payment"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                    className="radio-input"
                  />
                  <FaQrcode className="payment-icon" />
                  <div className="payment-content">
                    <h3>Digital Payment (UPI/QR)</h3>
                    <p>Pay securely using QR code</p>
                  </div>
                </div>

                {/* QR Code Display */}
                {paymentMethod === 'qr' && (
                  <div className="qr-display">
                    <h4>Scan to Pay ₹{finalTotal}</h4>
                    <div className="qr-code">
                      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="white"/>
                        <rect x="20" y="20" width="40" height="40" fill="black"/>
                        <rect x="140" y="20" width="40" height="40" fill="black"/>
                        <rect x="20" y="140" width="40" height="40" fill="black"/>
                        <rect x="60" y="60" width="80" height="80" fill="white" stroke="black" strokeWidth="2"/>
                        <rect x="70" y="70" width="60" height="60" fill="black"/>
                        <circle cx="100" cy="100" r="20" fill="white"/>
                        <rect x="85" y="85" width="30" height="30" fill="black"/>
                        <rect x="90" y="90" width="20" height="20" fill="white"/>
                      </svg>
                    </div>
                    <p className="qr-hint">UPI ID: freshmart@upi</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="order-summary-section">
                <h3>Order Total</h3>
                <div className="summary-box">
                  <div className="summary-row">
                    <span>Items ({cartItems.length})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="pay-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard /> Complete Payment
                    </>
                  )}
                </button>

                <button 
                  onClick={() => setStep(1)}
                  className="back-btn-secondary"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: SUCCESS
  if (step === 3) {
    return (
      <div>
        <Navbar />
        <div className="checkout-page">
          <div className="success-container">
            <div className="success-box">
              <div className="success-checkmark">
                <FaCheckCircle />
              </div>
              
              <h1>Order Placed Successfully!</h1>
              <p className="success-message">Thank you for your order</p>

              <div className="order-info">
                <div className="info-row">
                  <span className="label">Order ID:</span>
                  <span className="value">{orderDetails?.orderId}</span>
                </div>
                <div className="info-row">
                  <span className="label">Total Amount:</span>
                  <span className="value">₹{orderDetails?.totalAmount}</span>
                </div>
                <div className="info-row">
                  <span className="label">Payment Method:</span>
                  <span className="value">
                    {orderDetails?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Digital Payment'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{orderDetails?.estimatedDelivery}</span>
                </div>
              </div>

              <div className="success-actions">
                <button onClick={() => navigate('/')} className="home-btn">
                  Continue Shopping
                </button>
                <button onClick={() => navigate('/orders')} className="orders-btn">
                  View My Orders
                </button>
              </div>

              <div className="order-notification">
                <p>📱 You'll receive an SMS update shortly</p>
                <p>📧 Order confirmation sent to your email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}