import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Store AI",
  description: "AI-powered e-commerce with product search, cart, wishlist, and profile.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 font-sans text-slate-900">
        <CartProvider>
          <WishlistProvider>
            <NavBar />
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
