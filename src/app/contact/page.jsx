'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
   // Note: In a real Next.js application, form submission should be handled 
   // by an API route or server action for security. This state is for UI purposes.
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });
   const [status, setStatus] = useState('');

   const ACCENT_COLOR = 'bg-sky-300';
   const ACCENT_TEXT = 'text-sky-200';

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setStatus('Submitting...');

      // --- Dummy Submission Logic ---
      setTimeout(() => {
         console.log('Form Submitted:', formData);
         setStatus('Message Sent Successfully!');
         setFormData({ name: '', email: '', message: '' });
      }, 1500);
      //  End Dummy Submission Logic 
   };

   return (
      <section className="py-20 sm:py-24 bg-gradient-to-b from-blue-400 bg-sky-200 ">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center mb-16">
               <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  Get In <span className={ACCENT_TEXT}>Touch</span>
               </h1>
               <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">
                  We are here to answer your questions and provide support. Fill out the form or reach us directly.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white p-8 rounded-xl shadow-2xl">

               {/* Contact Info (Left Column) */}
               <div className="lg:col-span-1 space-y-8 p-6 bg-blue-50 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 border-blue-200">Contact Information</h2>

                  <div className="flex items-start space-x-4">
                     <Phone className={`w-6 h-6 ${ACCENT_TEXT} mt-1 flex-shrink-0`} />
                     <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+880 1742394552</p>
                     </div>
                  </div>

                  <div className="flex items-start space-x-4">
                     <Mail className={`w-6 h-6 ${ACCENT_TEXT} mt-1 flex-shrink-0`} />
                     <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">hasib64dj@gmail.com</p>
                     </div>
                  </div>

                  <div className="flex items-start space-x-4">
                     <MapPin className={`w-6 h-6 ${ACCENT_TEXT} mt-1 flex-shrink-0`} />
                     <div>
                        <h4 className="font-semibold text-gray-900">Office Address</h4>
                        <p className="text-gray-600">123, Mison Road, Chandpur, Bangladesh</p>
                     </div>
                  </div>
               </div>

               {/* Contact Form (Right Column) */}
               <div className="lg:col-span-2 p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us A Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">

                     {/* Name */}
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input
                           type="text"
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     {/* Email */}
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     {/* Message */}
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                        <textarea
                           id="message"
                           name="message"
                           rows="4"
                           value={formData.message}
                           onChange={handleChange}
                           required
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>

                     {/* Status/Error Message */}
                     {status && (
                        <p className={`text-center py-2 rounded-lg font-semibold ${status.includes('Successfully') ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                           {status}
                        </p>
                     )}

                     {/* Submit Button */}
                     <button
                        type="submit"
                        className={`w-full flex items-center justify-center p-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ${ACCENT_COLOR} hover:bg-blue-500`}
                        disabled={status.includes('Submitting')}
                     >
                        <Send className="w-5 h-5 mr-2" />
                        {status.includes('Submitting') ? 'Sending...' : 'Send Message'}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}