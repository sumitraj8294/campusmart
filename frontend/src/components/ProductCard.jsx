import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.category}</p>
        <div className="price">₹{product.price}</div>
      </div>
    </div>
  );
}
