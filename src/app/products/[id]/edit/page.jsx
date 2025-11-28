'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProductPage() {
   const params = useParams();
   const router = useRouter();
   const id = params.id;

   const [product, setProduct] = useState({
      name: '',
      price: '',
      category: '',
      description: '',
      imageUrl: '',
      isTrending: false
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!id) return;
      fetch(`https://shopnex-server.vercel.app/products/${id}`)
         .then(res => res.json())
         .then(data => setProduct({
            name: data.name || '',
            price: data.price || '',
            category: data.category || '',
            description: data.description || '',
            imageUrl: data.imageUrl || '',
            isTrending: data.isTrending || false
         }))
         .catch(err => toast.error('Failed to load product'))
         .finally(() => setLoading(false));
   }, [id]);

   const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setProduct(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
   };

   const handleSubmit = async e => {
      e.preventDefault();
      try {
         const res = await fetch(`https://shopnex-server.vercel.app/product/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
         });
         if (!res.ok) throw new Error('Update failed');
         toast.success('Product updated successfully!');
         router.push('/menageproducts'); // redirect after edit
      } catch (err) {
         console.error(err);
         toast.error('Error updating product');
      }
   };

   if (loading) return <p className="text-center mt-20">Loading product...</p>;

   return (
      <div className="max-w-3xl mx-auto py-12 px-4">
         <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
         <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <input
               type="text"
               name="name"
               placeholder="Product Name"
               value={product.name}
               onChange={handleChange}
               className="w-full p-3 border rounded"
               required
            />
            <input
               type="number"
               name="price"
               placeholder="Price"
               value={product.price}
               onChange={handleChange}
               className="w-full p-3 border rounded"
               required
            />
            <input
               type="text"
               name="category"
               placeholder="Category"
               value={product.category}
               onChange={handleChange}
               className="w-full p-3 border rounded"
            />
            <textarea
               name="description"
               placeholder="Description"
               value={product.description}
               onChange={handleChange}
               className="w-full p-3 border rounded"
            />
            <input
               type="text"
               name="imageUrl"
               placeholder="Image URL"
               value={product.imageUrl}
               onChange={handleChange}
               className="w-full p-3 border rounded"
            />
            <label className="flex items-center gap-2">
               <input
                  type="checkbox"
                  name="isTrending"
                  checked={product.isTrending}
                  onChange={handleChange}
               />
               Trending
            </label>

            <button
               type="submit"
               className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
               Update Product
            </button>
         </form>
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
   );
}
