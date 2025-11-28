import React from 'react';
import { Search, ShoppingCart, CreditCard, Package } from 'lucide-react';
// Icons changed to fit an e-commerce workflow: Search, Cart, Payment, Delivery.

const workSteps = [
   {
      icon: Search,
      title: 'Browse & Select',
      description: 'Explore our curated collections and find the perfect products for your needs.',
   },
   {
      icon: ShoppingCart,
      title: 'Add to Cart',
      description: 'Easily add your desired items to the shopping cart with a single click.',
   },
   {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Complete your purchase safely using various reliable payment methods.',
   },
   {
      icon: Package,
      title: 'Fast Delivery',
      description: 'Your order is quickly packaged and dispatched for doorstep delivery.',
   },
];

export default function Section1() {
   return (
      // Section Container: Matches the light blue-gray background from the image
      <section className="py-20 sm:py-24 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-400">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section: "How to Shop" title */}
            <div className="text-center mb-12 sm:mb-16">
               <h2 className="text-4xl font-extrabold text-gray-700 sm:text-5xl tracking-tight">
                  How to <span className="text-gray-700 font-bold">Shop</span>
               </h2>
            </div>

            {/* Cards Grid: Shop Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {workSteps.map((step, index) => (
                  <div
                     key={index}
                     // Card Styling
                     className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition duration-300 transform hover:shadow-2xl hover:scale-[1.02]"
                     style={{
                        borderRadius: '16px',
                        border: '1px solid #f0f4f8',
                     }}
                  >
                     <div className="flex flex-col items-start text-left">

                        {/* Icon Container: Light background with a dark, greenish-teal icon */}
                        <div className="p-4 bg-gray-50 rounded-xl mb-6">
                           <step.icon className="w-8 h-8 text-teal-700" aria-hidden="true" />
                        </div>

                        {/* Title of the step */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                           {step.title}
                        </h3>

                        {/* Description of the step */}
                        <p className="text-gray-600 text-base leading-relaxed">
                           {step.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}