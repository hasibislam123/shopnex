'use client';

import React, { useState } from 'react';

const tabsData = [
   {
      id: 'story',
      label: 'Story',
      content: (
         <>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
               We started with a simple promise — to make parcel delivery fast, reliable, and stress-free.
               Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service
               has made us a trusted partner for thousands. Whether its a personal gift or a time-sensitive
               business delivery, we ensure it reaches its destination — on time, every time.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
               Our journey began with a vision to revolutionize the shipping experience, focusing on transparency and efficiency.
               Today, we continue to innovate, adapting to the evolving needs of our clients while maintaining the highest standards of service.
            </p>
         </>
      ),
   },
   {
      id: 'mission',
      label: 'Mission',
      content: (
         <>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
               Our mission is to empower businesses and individuals with seamless, secure, and sustainable logistics solutions.
               We strive to set new benchmarks in delivery speed and reliability, fostering trust and enabling growth for our community.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
               We are dedicated to continuously improving our services, leveraging technology and a passionate team to exceed customer expectations every single day.
            </p>
         </>
      ),
   },
   {
      id: 'success',
      label: 'Success',
      content: (
         <>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
               Our success is measured by the satisfaction of our customers and the consistent achievement of delivery milestones.
               From handling millions of parcels to expanding our network across the country, every achievement reflects our dedication.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
               We pride ourselves on our problem-solving capabilities and our ability to deliver even in challenging circumstances, ensuring our clients peace of mind.
            </p>
         </>
      ),
   },
   {
      id: 'team',
      label: 'Team & Others',
      content: (
         <>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
               Our diverse and dedicated team is the heart of our operations. Comprising experienced logisticians, tech innovators,
               and customer service specialists, we work collaboratively to ensure every delivery is a success.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
               Beyond our core team, we also collaborate with a network of partners to ensure extensive reach and specialized services,
               always prioritizing efficiency and customer satisfaction.
            </p>
         </>
      ),
   },
];

export default function About() {
   const [activeTab, setActiveTab] = useState(tabsData[0].id); // Default to 'Story'

   const activeContent = tabsData.find(tab => tab.id === activeTab)?.content;

   return (
      <section className="bg-gradient-to-b from-blue-400 bg-sky-200 py-20 sm:py-24">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                  About <span className="text-sky-200">Us</span>
               </h2>
               <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
               </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center border-b-2 border-gray-200 mb-8 max-w-4xl mx-auto">
               {tabsData.map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`py-3 px-6 text-lg font-medium transition-colors duration-300 relative group
                ${activeTab === tab.id
                           ? 'text-sky-700'
                           : 'text-gray-600 hover:text-sky-700'
                        }`}
                  >
                     {tab.label}
                     {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-700 transform scale-x-100 transition-transform duration-300"></span>
                     )}
                     {activeTab !== tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                     )}
                  </button>
               ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border-l-4 border-sky-500 transition-all duration-500 ease-in-out">
               {activeContent}
            </div>

         </div>
      </section>
   );
}