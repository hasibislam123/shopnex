'use client';
import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
// Note: Install 'lucide-react' if you haven't already: npm install lucide-react

const blogPosts = [
   {
      id: 1,
      title: "How We Achieved 99.9% On-Time Delivery",
      excerpt: "Discover the technology and logistics strategies we implemented to ensure nearly perfect on-time delivery rates across the country.",
      date: "November 20, 2025",
      author: "Admin",
      imageUrl: "https://i.ibb.co.com/h1hs13wq/fotos-Samx-GMPc-TF4-unsplash.jpg", // Placeholder
   },
   {
      id: 2,
      title: "The Future of E-commerce Logistics in Bangladesh",
      excerpt: "An in-depth look at emerging trends, challenges, and innovations that will shape the e-commerce delivery landscape in the coming years.",
      date: "November 15, 2025",
      author: "Logistics Expert",
      imageUrl: "https://i.ibb.co.com/zcSF5bb/msi-sakib-5d9r2ommx-As-unsplash.jpg", // Placeholder
   },
   {
      id: 3,
      title: "Understanding Reverse Logistics: Returns Made Simple",
      excerpt: "Learn how efficient reverse logistics processes can enhance customer satisfaction and reduce operational costs for online businesses.",
      date: "November 10, 2025",
      author: "Operations Team",
      imageUrl: "https://i.ibb.co.com/vC11SvC5/shutter-speed-BQ9usyz-Hx-w-unsplash.jpg", // Placeholder

   },
];

export default function Blog() {
   const ACCENT_COLOR = 'text-sky-200';
   const BUTTON_BG = 'bg-sky-300';

   return (
      <section className="py-20 sm:py-24 bg-gradient-to-b from-blue-400 bg-sky-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                  Our Latest <span className={ACCENT_COLOR}>Insights</span>
               </h2>
               <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Stay updated with our newest articles on logistics, e-commerce trends, and delivery technology.
               </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {blogPosts.map((post) => (
                  <div
                     key={post.id}
                     className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
                  >

                     {/* Image Placeholder */}
                     <div className="h-70 bg-gray-200 w-full flex items-center justify-center text-gray-500">
                        <img className='h-70 w-full' src={post.imageUrl} alt="" />


                     </div>

                     <div className="p-6">
                        {/* Meta Data */}
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                           <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date}</span>
                           </div>
                           <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{post.author}</span>
                           </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug hover:text-sky-300 transition-colors duration-200">
                           {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                           {post.excerpt}
                        </p>

                        {/* Read More Button */}
                        <a
                           href={`/blog/${post.id}`}
                           className={`inline-flex items-center font-semibold hover:text-sky-400 transition-colors duration-200`}
                        >
                           Read Article
                           <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                     </div>
                  </div>
               ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
               <a
                  href="/blog"
                  className={`inline-flex items-center px-8 py-3 rounded-full text-white font-semibold shadow-lg transition duration-300 
                           ${BUTTON_BG} hover:bg-blue-500 transform hover:scale-[1.03]`}
               >
                  View All Blogs
               </a>
            </div>
         </div>
      </section>
   );
}