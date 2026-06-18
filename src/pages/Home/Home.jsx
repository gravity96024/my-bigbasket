import { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { categories, products } from '../../data/products';
import '../../styles/Home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(200);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      <Navbar />
      
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Fresh Groceries Delivered to Your Door</h1>
          <p>Quality products at amazing prices, delivered within 30 minutes</p>
          <button className="hero-btn">Shop Now</button>
        </div>
      </div>

      <div className="home-container">
        <div className="home-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Category</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category.id} className="filter-checkbox">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={selectedCategory === category.value}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="range-slider"
                />
                <p className="price-display">Up to ₹{priceRange}</p>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Rating</h3>
              <div className="filter-options">
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐⭐ 5 Star</span>
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐ 4 Star & above</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="main-content">
            {/* Top Bar */}
            <div className="products-top-bar">
              <div className="products-count">
                <h2>Products</h2>
                <span className="count-badge">{filteredProducts.length} items</span>
              </div>
              
              <div className="sort-controls">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🛒</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Fresh, quality groceries delivered fast</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#fb">Facebook</a>
              <a href="#tw">Twitter</a>
              <a href="#ig">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FreshMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}