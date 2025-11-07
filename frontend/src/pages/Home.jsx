import React, { useEffect, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/products/all");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleBuy = (product) => {
    alert(`🛒 You are interested in buying "${product.title}"`);
    // later: redirect to order or chat page
  };

  return (
    <div className="home-container">
      <h2>🛍️ Explore CampusMart</h2>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading products...</p>}

      <div className="product-grid">
        {products.length === 0 && !loading ? (
          <p>No products listed yet.</p>
        ) : (
          products.map((p) => (
            <div className="product-card" key={p.id}>
              <img
                src={
                  p.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                }
                alt={p.title}
              />
              <h3>{p.title}</h3>
              <p className="price">₹{p.price}</p>
              <p className="desc">{p.description}</p>
              <p className="seller">
  👤 Seller: <strong>{p.sellerName}</strong><br />
  📧 {p.sellerEmail}
</p>

              <button className="buy-btn" onClick={() => handleBuy(p)}>
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
