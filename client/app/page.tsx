"use client";

import { useState, useEffect } from "react";

interface Product {
  _id: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  tags: string[];
  is_active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch function with URLSearchParams
  const fetchProducts = async (min = "", max = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (min) params.append("minPrice", min);
      if (max) params.append("maxPrice", max);

      // Adjust API domain/port to match your Express server setup
      const res = await fetch(`http://localhost:5000/api/new-products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(minPrice, maxPrice);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    fetchProducts("", "");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Products</h1>

      {/* Price Range Form */}
      <form
        onSubmit={handleFilterSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <div>
          <label htmlFor="minPrice">Min Price: </label>
          <input
            id="minPrice"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label htmlFor="maxPrice">Max Price: </label>
          <input
            id="maxPrice"
            type="number"
            placeholder="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Filter
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#666",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </form>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found within this price range.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{product.title}</h3>
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Brand:</strong> {product.brand} | <strong>Category:</strong> {product.category}
              </p>
              <p style={{ margin: "0 0 4px 0" }}>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                Rating: ⭐ {product.rating} | Stock: {product.stock}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}