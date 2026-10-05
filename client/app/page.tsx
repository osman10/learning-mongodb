// app/products/page.tsx

// 1. Declare Product Type directly on the same page
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

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const res = await fetch(`${baseUrl}/api/new-products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// 3. Main Component Page
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Arrivals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <span>{product.brand}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                  {product.category}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center space-x-3 mb-4 text-sm">
                <div className="flex items-center text-amber-500 font-semibold">
                  ★ <span className="ml-1 text-gray-800">{product.rating}</span>
                </div>
                <span className="text-gray-300">•</span>
                <span
                  className={
                    product.stock > 0
                      ? "text-emerald-600 font-medium"
                      : "text-red-500 font-medium"
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
                    className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Specifications Box */}
              <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Color:</span>
                  <span className="font-medium text-gray-700">
                    {product.specifications.color}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Battery:</span>
                  <span className="font-medium text-gray-700">
                    {product.specifications.battery_life_hours} Hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SKU:</span>
                  <span className="font-mono text-gray-700">{product.sku}</span>
                </div>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <button
                disabled={!product.is_active || product.stock === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}