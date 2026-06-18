import { useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import '../styles/ProductCard.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        
        <div className="product-badges">
          <span className="discount-badge">-{discountPercent}%</span>
          <button
            className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <FaHeart />
          </button>
        </div>

        {product.badge && (
          <div className="fresh-badge">{product.badge}</div>
        )}

        <div className={`cart-indicator ${addedToCart ? 'show' : ''}`}>
          ✓ Added to Cart
        </div>
      </div>

      {/* Info Section */}
      <div className="product-info">
        <h3 className="product-name" title={product.name}>{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          <FaStar className="star" />
          <span className="rating-value">{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.originalPrice}</span>
        </div>

        {/* Stock Status */}
        <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
          {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`add-cart-btn ${addedToCart ? 'added' : ''}`}
          disabled={product.stock === 0}
        >
          <FaShoppingCart /> {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}