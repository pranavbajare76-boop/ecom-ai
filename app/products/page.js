"use client";
import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Shop All Products</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Browse the full catalog, add favorites to wishlist, and drop items into your cart in one polished ecommerce experience.
        </p>
      </section>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">No products available yet.</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
