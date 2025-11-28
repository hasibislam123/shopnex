'use client'; 
import React from 'react';
import { LocateFixed, ShieldCheck, PhoneCall } from 'lucide-react';
// Note: Install 'lucide-react' if you haven't already: npm install lucide-react

const features = [
  {
    icon: LocateFixed,
    title: 'Live Parcel Tracking',
    description: 'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
    imageSrc: '/images/tracking-illustration.png', // Placeholder for illustration
  },
  {
    icon: ShieldCheck,
    title: '100% Safe Delivery',
    description: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery, every time.',
    imageSrc: '/images/safe-delivery-illustration.png', 
  },
  {
    icon: PhoneCall,
    title: '24/7 Call Center Support',
    description: 'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    imageSrc: '/images/support-illustration.png', 
  },
  ];

export default function Section3() {
  const SKY_BLUE_ACCENT = 'text-blue-600';
  const LIGHT_BG_ACCENT = 'bg-blue-50';

  return (
    // Section Container: Light, neutral background
    <section className="py-20 sm:py-24 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-400 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Why Choose <span className={SKY_BLUE_ACCENT}>Shopnex</span>?
          </h2>
          <p className="mt-3 text-xl text-gray-500 max-w-3xl mx-auto">
            Our commitment is to speed, safety, and support—guaranteed.
          </p>
        </div>

        {/* Features Grid/List */}
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl ${LIGHT_BG_ACCENT}`}
              // Alternating layout for visual appeal
              style={{ flexDirection: index % 2 === 0 ? 'row-reverse' : 'row' }}
            >
              
              {/* Image/Icon Illustration Area (Left/Right) */}
              <div className="w-full md:w-1/3 flex justify-center p-4">
                {/* For a real project, replace this div with a Next.js Image component loading a decorative illustration */}
                <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center border-4 border-dashed border-blue-200 rounded-full">
                  <feature.icon className={`w-12 h-12 ${SKY_BLUE_ACCENT}`} aria-hidden="true" />
                </div>
              </div>

              {/* Text Content Area (Right/Left) */}
              <div className="w-full md:w-2/3 md:p-6 mt-6 md:mt-0">
                <div className="flex items-center gap-3 mb-3">
                  <feature.icon className={`w-6 h-6 ${SKY_BLUE_ACCENT}`} />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}