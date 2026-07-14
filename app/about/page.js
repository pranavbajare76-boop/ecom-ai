export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">About E-Store AI</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          E-Store AI is a sample e-commerce storefront built with Next.js, Tailwind CSS, and AI-powered product search. It demonstrates cart and wishlist features, vector search integration, and a product-first shopping experience.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Smart Search</h2>
            <p className="mt-3 text-slate-600">Search with natural language and discover relevant products without exact keyword matching.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-950">Cart & Wishlist</h2>
            <p className="mt-3 text-slate-600">Add products to your cart or save them for later in your wishlist.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
