"use client";

import { useEffect, useState } from "react";

// 1. Declare Product Type
type Product = {
  _id: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  tags: string[];
  specifications: {
    color: string;
    battery_life_hours: number;
  };
  is_active: boolean;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  // 2. Fetch Data on Mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${baseUrl}/api/new-products`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 3. Extract Unique Categories dynamically
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // 4. Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesStock = !inStockOnly || product.stock > 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400 font-medium bg-zinc-950 min-h-screen">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-400 font-medium bg-zinc-950 min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">New Arrivals</h1>

        {/* Filter Bar Controls */}
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search title, brand, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-sm font-medium text-zinc-400">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-zinc-400 select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-sky-500 focus:ring-sky-500 focus:ring-offset-zinc-900"
            />
            In Stock Only
          </label>
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No products found matching your filters.
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg hover:border-zinc-700 transition-all p-6 flex flex-col justify-between"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    <span>{product.brand}</span>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                      {product.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2">
                    {product.title}
                  </h2>

                  {/* Rating & Stock */}
                  <div className="flex items-center space-x-3 mb-4 text-sm">
                    <div className="flex items-center text-amber-400 font-semibold">
                      ★ <span className="ml-1 text-zinc-100">{product.rating}</span>
                    </div>
                    <span className="text-zinc-700">•</span>
                    <span
                      className={
                        product.stock > 0
                          ? "text-emerald-400 font-medium"
                          : "text-red-400 font-medium"
                      }
                    >
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-sky-950 text-sky-300 text-xs px-2.5 py-1 rounded-full font-medium border border-sky-900"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Specifications Box */}
                  <div className="bg-zinc-800/50 rounded-xl p-3 text-xs text-zinc-300 space-y-1 mb-6 border border-zinc-800">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Color:</span>
                      <span className="font-medium text-zinc-100">
                        {product.specifications.color}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Battery:</span>
                      <span className="font-medium text-zinc-100">
                        {product.specifications.battery_life_hours} Hours
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">SKU:</span>
                      <span className="font-mono text-zinc-100">{product.sku}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">Price</p>
                    <p className="text-2xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <button
                    disabled={!product.is_active || product.stock === 0}
                    className="bg-sky-600 hover:bg-sky-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}