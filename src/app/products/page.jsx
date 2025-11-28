'use client'

import { useEffect, useState } from "react";
import ProductCard from "./Card/Card";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTrending, setFilterTrending] = useState(false);
  const [sortPrice, setSortPrice] = useState("");

  // 🔹 Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://shopnex-server.vercel.app/products"); // API route
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error loading products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Filtering + Searching + Sorting
  useEffect(() => {
    let updated = [...products];

    if (search.trim()) {
      updated = updated.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterTrending) {
      updated = updated.filter(item => item.isTrending === true);
    }

    if (sortPrice === "low-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "high-low") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFiltered(updated);
  }, [search, filterTrending, sortPrice, products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#50a2ff] to-white pt-24 px-6 pb-32">

      {/* Header Title */}
      <h1 className="text-4xl font-bold text-gray-900 text-center drop-shadow-md">
        Explore Premium Shoes
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Find your perfect comfort, style & performance
      </p>

      {/* Filters Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mt-10 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Shoes..."
          className="w-full md:w-1/3 p-3 rounded-xl border border-gray-600 outline-none focus:ring-2 focus:ring-[#6ea8ff]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Trending Filter */}
        <button
          onClick={() => setFilterTrending(!filterTrending)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition 
            ${filterTrending
              ? "bg-[#3586ffb7] text-white"
              : "bg-white border border-gray-600 text-gray-700 hover:bg-[#6ea8ff]/20"
            }`}
        >
          Trending Only
        </button>

        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSortPrice(e.target.value)}
          className="w-full md:w-auto p-3 rounded-xl border border-gray-600 focus:ring-[#6ea8ff]"
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-14 max-w-7xl mx-auto">
        {filtered.length > 0 ? (
          filtered.map((item) => <ProductCard key={item._id || item.id} product={item} />)
        ) : (
          <p className="text-center col-span-4 text-xl font-semibold text-gray-700">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
