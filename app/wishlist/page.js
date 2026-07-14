"use client";
import Link from "next/link";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Wishlist</h1>
        <p className="mt-3 text-slate-600">Your favorite products ready for later.</p>
      </section>

      {wishlistItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          Your wishlist is empty. <Link href="/products" className="font-semibold text-slate-950 underline">Explore products</Link> to add favorites.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {wishlistItems.map((product) => (
            <div key={product._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <img src={product.image} alt={product.title} className="h-28 w-28 rounded-3xl object-cover" />
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{product.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{product.category}</p>
                  <p className="mt-4 text-lg font-bold text-slate-900">${product.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Remove from wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
