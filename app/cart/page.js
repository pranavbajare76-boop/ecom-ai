"use client";
import { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const formattedPrice = useMemo(() => totalPrice.toFixed(2), [totalPrice]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Shopping Cart</h1>
        <p className="mt-3 text-slate-600">Review your items before checkout.</p>
      </section>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          Your cart is empty. <Link href="/products" className="font-semibold text-slate-950 underline">Browse products</Link> to add something nice.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.75fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <img src={item.image} alt={item.title} className="h-32 w-32 rounded-3xl object-cover" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    <p className="mt-4 text-lg font-bold text-slate-900">${item.price}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    Qty
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                      className="w-20 rounded-full border border-slate-300 p-2 text-sm"
                    />
                  </label>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Order summary</p>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-slate-950">
                <span>Total</span>
                <span>${formattedPrice}</span>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="mt-8 w-full rounded-3xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
