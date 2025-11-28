"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const Card = ({ product }) => {
  const defaultProduct = {
    id: 1,
    name: "Nike Running Shoes",
    description: "Lightweight, durable, and built for peak performance every step of the way.",
    price: 59.99,
    isTrending: true,
    imageUrl: "/images/shoe-placeholder.png",
  };

  const item = product || defaultProduct;
  const detailsHref = `/products/${item.id}`;

  return (
    <Link
      href={detailsHref}
      className="w-80 block rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02]"
    >
      {/* Top Image Section */}
      <div className="relative h-64 bg-gray-50 flex flex-col justify-end">
        <div
          className="relative h-48 w-full bg-gray-900/5 backdrop-blur-sm overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.7) 100%)",
          }}
        >
          <Image
            src={item.imageUrl || defaultProduct.imageUrl}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0 m-auto z-10 transform scale-125"
          />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-900 opacity-95 z-0"></div>
        </div>

        {/* Trending Badge */}
        {item.isTrending && (
          <span className="absolute top-4 left-4 z-20 bg-sky-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Trending
          </span>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            /* Wishlist logic */
          }}
          className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 transition"
          aria-label="Add to Wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-6 space-y-3 bg-white">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{item.description}</p>
        </div>

        {/* Price + Details Button */}
        <div className="flex justify-between items-center pt-3">
          <span className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
          <div className="bg-gray-900 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition duration-150 shadow-md hover:bg-gray-800">
            Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;