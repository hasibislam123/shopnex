'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PrivateRoute from '@/Component/PrivateRoute';

export default function AddProductPage() {
  return (
    <PrivateRoute>
      <AddProductForm />
    </PrivateRoute>
  );
}

function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    // Convert price and stock to number
    const payload = {
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category: data.category,
      description: data.description,
      email: data.email, // <-- new field
      photo: data.photo?.[0] ? data.photo[0].name : null // backend expects URL or name
    };

    try {
      const res = await fetch('https://shopnex-server.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to add product');

      alert('Product added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Error adding product. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-b from-blue-400 bg-sky-200  shadow-2xl rounded-xl">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 border-b pb-4">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Email Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Email (Gmail)</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Please enter a valid Gmail address."
              }
            })}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              {...register("name", { required: "Product Name is required." })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required." })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.price && <p className="text-red-500 mt-1 text-sm">{errors.price.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Stock Quantity</label>
            <input
              type="number"
              {...register("stock", { required: "Stock quantity is required." })}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Category</label>
            <select
              {...register("category", { required: "Category is required." })}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Footwear">Footwear</option>
              <option value="Books">Books</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required." })}
            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            rows={5}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-700">Product Photo (Optional)</label>
          <input type="file" accept="image/*" {...register("photo")} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-300 text-white font-bold py-3 rounded-xl hover:bg-sky-500 transition shadow-lg hover:shadow-xl mt-6"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
