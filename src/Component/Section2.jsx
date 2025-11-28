'use client'; 

import React, { useState } from 'react';
import { Truck, Globe, Box, Home, Briefcase, RefreshCw } from 'lucide-react';

const services = [
  {
    id: 1, // Unique ID for tracking clicks
    icon: Truck,
    title: 'Express & Standard Delivery',
    description: 'We deliver parcels within 24-72 hours in major cities. Express delivery in Dhaka within 4-6 hours from pick-up to drop-off.',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    id: 2,
    icon: Globe,
    title: 'Nationwide Coverage',
    description: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
    iconBg: 'bg-blue-100', 
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    icon: Box,
    title: 'Fulfillment Solutions',
    description: 'Customized service with inventory management, online order processing, packaging, and after-sales support for your business.',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    id: 4,
    icon: Home,
    title: 'Cash On Home Delivery',
    description: '100% cash on delivery anywhere in Bangladesh with guaranteed safety and secure handling of your product.',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    id: 5,
    icon: Briefcase,
    title: 'Corporate Logistics',
    description: 'Customized corporate services including warehouse, inventory management, and specialized B2B delivery solutions.',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    id: 6,
    icon: RefreshCw,
    title: 'Hassle-free Parcel Return',
    description: 'Through our reverse logistics facility, we allow end customers to return or exchange their products with online business merchants.',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
];

export default function Section2() {
  const [activeCardId, setActiveCardId] = useState(null);

  const handleCardClick = (id) => {
    setActiveCardId(id === activeCardId ? null : id);
  };

  return (
    <section className=" py-20 sm:py-28 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-400 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
            Our <span className="text-blue-400">Services</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const isActive = service.id === activeCardId;

            const activeClasses = isActive
              ? 'bg-blue-600 shadow-xl shadow-blue-500/50 transform scale-[1.05] transition duration-500'
              : 'bg-gray-800 shadow-md transition duration-500 hover:scale-[1.02]';

            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)} 
                className={`${activeClasses} p-8 rounded-2xl flex flex-col items-start text-left cursor-pointer border-2 ${
                  isActive ? 'border-blue-400' : 'border-transparent' 
                }`}
              >
                <div className={`${service.iconBg} p-4 rounded-xl mb-6`}> 
                  <service.icon className={`w-8 h-8 ${service.iconColor}`} aria-hidden="true" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${isActive ? 'text-white' : 'text-white'}`}>
                  {service.title}
                </h3>
                
                <p className={`${isActive ? 'text-blue-100' : 'text-gray-300'} text-base leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}