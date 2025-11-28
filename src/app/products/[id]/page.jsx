"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetailsPage() {
  const params = useParams(); // Hook to get URL params
  const { id } = params;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch products from public/product.json
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id.toString() === id);
        setProduct(found || null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#a2d2ff] to-white pt-24 px-6 pb-32  mx-auto">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl h-full shadow-lg p-6">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-80 md:h-[400px]">
          <Image
            src={product.imageUrl || "/images/shoe-placeholder.png"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.isTrending && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                Trending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}