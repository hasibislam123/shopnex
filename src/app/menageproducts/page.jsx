'use client';
import { useEffect, useState } from 'react';
import PrivateRoute from '@/Component/PrivateRoute';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageProductsPage() {
   return (
      <PrivateRoute>
         <ManageProducts />
      </PrivateRoute>
   );
}

function ManageProducts() {
   const { user, loading } = useAuth();
   const [products, setProducts] = useState([]);
   const [fetching, setFetching] = useState(true);

   // Modal state
   const [showModal, setShowModal] = useState(false);
   const [selectedId, setSelectedId] = useState(null);

   useEffect(() => {
      if (!user?.email) return;

      fetch(`https://shopnex-server.vercel.app/products/user/${user.email}`)
         .then(res => res.json())
         .then(data => setProducts(data))
         .catch(err => toast.error('Failed to fetch products'))
         .finally(() => setFetching(false));
   }, [user]);

   const openModal = (id) => {
      setSelectedId(id);
      setShowModal(true);
   };

   const closeModal = () => {
      setSelectedId(null);
      setShowModal(false);
   };

   const handleDelete = async () => {
      try {
         await fetch(`https://shopnex-server.vercel.app/product/${selectedId}?email=${user.email}`, { method: 'DELETE' });
         setProducts(prev => prev.filter(p => p._id !== selectedId));
         toast.success('Product deleted successfully!');
      } catch (err) {
         console.error(err);
         toast.error('Error deleting product');
      } finally {
         closeModal();
      }
   };

   if (loading) return <p className="text-center mt-20 text-gray-500 text-lg">Checking auth...</p>;
   if (!user) return <p className="text-center mt-20 text-red-500 text-lg">You must login to view this page</p>;
   if (fetching) return <p className="text-center mt-20 text-gray-500 text-lg">Loading products...</p>;

   return (
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
         <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Manage Your Products</h1>

         {products.length === 0 ? (
            <p className="text-center mt-10 text-gray-500 text-lg">No products found ☹</p>
         ) : (
            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
               <table className="w-full text-left">
                  <thead className="bg-gray-800 text-white">
                     <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-center">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {products.map(p => (
                        <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                           <td className="p-4 font-medium text-gray-700">{p.name}</td>
                           <td className="p-4 text-gray-600">${p.price}</td>
                           <td className="p-4 text-gray-600">{p.category}</td>
                           <td className="p-4 flex justify-center gap-2">
                              <Link href={`/product/${p._id}/edit`}>
                                 <button className="px-4 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Edit
                                 </button>
                              </Link>
                              <button
                                 onClick={() => openModal(p._id)}
                                 className="px-4 py-1 bg-red-400 text-white rounded-md hover:bg-red-700 transition-colors"
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
                  <p className="mb-6 text-gray-600">Are you sure you want to delete this product?</p>
                  <div className="flex justify-between gap-4">
                     <button
                        onClick={closeModal}
                        className="flex-1 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleDelete}
                        className="flex-1 py-2 bg-red-400 text-white rounded-md hover:bg-red-700 transition-colors"
                     >
                        Confirm
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Toast container */}
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
   );
}
