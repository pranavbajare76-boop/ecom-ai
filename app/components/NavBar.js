"use client";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function NavBar() {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-slate-950 text-white sticky top-0 z-30 shadow-lg shadow-slate-950/10">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          E-Store
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-200">
          <Link href="/products" className="hover:text-white">
            Products
          </Link>
          <Link href="/orders" className="hover:text-white">
            Orders
          </Link>
          <Link href="/wishlist" className="hover:text-white">
            Wishlist
          </Link>
          <Link href="/profile" className="hover:text-white">
            Profile
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/login" className="px-4 py-2 text-sm text-slate-200 hover:text-white">
            Login
          </Link>
          <Link
            href="/wishlist"
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800"
          >
            Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-900 bg-slate-950/95 text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 px-4 py-2 text-xs">
          <span>Free shipping for all orders over $99</span>
          <span>30-day return policy</span>
          <span>Support available 24/7</span>
        </div>
      </div>
    </header>
  );
}
