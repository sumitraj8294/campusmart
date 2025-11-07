import React, { useEffect, useState } from "react";
import "../styles/MyListings.css";

export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch My Products
  const fetchProducts = async () => {
    if (!token) return setError("Please log in to view your listings.");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/products/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add New Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("Product added successfully!");
      setNewProduct({
        title: "",
        description: "",
        category: "",
        price: "",
        imageUrl: "",
      });
      fetchProducts();
    } catch (err) {
      setError("Failed to add product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete a Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mylistings-container">
      <h2>📦 My Listings</h2>

      {error && <p className="error-message">{error}</p>}

      {/* Add New Product */}
      <form className="product-form" onSubmit={handleAddProduct}>
        <h3>Add a New Product</h3>
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="product-grid">
        {loading && <p>Loading...</p>}
        {products.length === 0 && !loading ? (
          <p>No products found.</p>
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
              <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
