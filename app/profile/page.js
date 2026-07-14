import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Your Profile</h1>
        <p className="mt-3 max-w-2xl text-slate-600">Manage your account details, order history, and saved preferences.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Account Information</h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Name</p>
              <p className="mt-2 text-base text-slate-900">Alex Johnson</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 text-base text-slate-900">alex@example.com</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Member since</p>
              <p className="mt-2 text-base text-slate-900">January 2025</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Edit Profile
            </button>
            <button className="rounded-3xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              Manage Payment
            </button>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Quick Actions</h2>
          <ul className="mt-6 space-y-3 text-slate-600">
            <li>
              <Link href="/orders" className="font-medium text-slate-900 hover:text-slate-700">View order history</Link>
            </li>
            <li>
              <Link href="/wishlist" className="font-medium text-slate-900 hover:text-slate-700">View wishlist</Link>
            </li>
            <li>
              <Link href="/cart" className="font-medium text-slate-900 hover:text-slate-700">Review your cart</Link>
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
