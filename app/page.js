"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const addToCart = (product) => {
    console.log("Added to cart:", product.title);
  };

  const normalizeProducts = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.products)) return data.products;
    return [];
  };

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(normalizeProducts(data));
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const res = await fetch("/api/ai-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setProducts(normalizeProducts(data));
    setLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Powered E-Commerce</h1>
      
      {/* Search Input UI */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Describe what you want (e.g., 'something comfy to run in')"
          className="border border-slate-300 p-2 rounded w-full bg-white text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded font-medium hover:bg-slate-700">
          Search
        </button>
      </form>

      {/* Catalog Render Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border border-slate-200 rounded p-4 flex flex-col justify-between cursor-pointer">
              <div>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded mb-4" />
                <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <span className="inline-block bg-slate-100 text-xs px-2 py-1 rounded mb-4 font-mono">{product.category}</span>
              </div>
              <div>
                <div className="text-xl font-bold mb-2">${product.price}</div>
                <button 
                  onClick={() => addToCart(product)} 
                  className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}