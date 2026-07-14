"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body?.message || "Login failed");
        setLoading(false);
        return;
      }

      // on success redirect to profile or home
      router.push("/profile");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-semibold mb-6">Sign in to your account</h1>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <label className="block mb-3">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
}
