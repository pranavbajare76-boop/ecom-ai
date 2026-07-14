"use client";
import { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlistItems } = useWishlist();

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
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setProducts(normalizeProducts(data));
    setLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10 rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl shadow-slate-950/20 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">AI-powered shopping</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Search smarter and shop faster with vector-powered product matching.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Get recommendations tailored by semantic search, build your wishlist, and manage your cart with a modern storefront UI.
            </p>
          </div>

          <div className="rounded-[2rem] bg-slate-900 p-7 shadow-2xl shadow-slate-950/20 sm:p-10">
            <p className="mb-4 text-sm text-amber-400">Wishlist items</p>
            <p className="text-5xl font-bold text-white">{wishlistItems.length}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Keep track of favorites and add them to your cart later.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products like dinner sets, running shoes, or earbuds"
            className="min-w-0 flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-slate-800 focus:ring-2 focus:ring-amber-300"
          />
          <button
            type="submit"
            className="rounded-3xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </section>

      <section className="space-y-8">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">No products found. Try another search or browse the catalog.</div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </main>
  );
}
