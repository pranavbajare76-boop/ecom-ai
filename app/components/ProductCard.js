"use client";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product._id);

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-3xl bg-slate-100">
        <img src={product.image} alt={product.title} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{product.title}</h2>
        </div>

        <p className="text-sm leading-6 text-slate-600 line-clamp-3">{product.description}</p>

        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add to Cart
          </button>
        </div>

        <button
          type="button"
          onClick={() => (inWishlist ? removeFromWishlist(product._id) : addToWishlist(product))}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
        >
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </article>
  );
}
