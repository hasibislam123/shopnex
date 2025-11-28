'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';

const faqData = [
   {
     id: 1,
     question: "How does this product ordering process work?",
     answer: "The process is simple: Browse our selection, add items to your cart, proceed to checkout, and complete the secure payment. Your order will be confirmed instantly.",
     isOpen: true,
   },
   {
     id: 2,
     question: "Is cash on delivery available nationwide?",
     answer: "Yes, Cash On Delivery (COD) is available across all major cities and districts nationwide. Please check your specific area during checkout.",
     isOpen: false,
   },
   {
     id: 3,
     question: "Can I track my parcel after placing the order?",
     answer: "Absolutely! Once your order is dispatched, you will receive a tracking link via email and SMS, allowing you to monitor your parcel's real-time journey.",
     isOpen: false,
   },
   {
     id: 4,
     question: "What is your return/exchange policy?",
     answer: "We offer a hassle-free return and exchange facility within 7 days of delivery, provided the item is unused and in its original packaging. See our detailed policy for more info.",
     isOpen: false,
   },
   {
     id: 5,
     question: "How do I contact customer support?",
     answer: "Our 24/7 Call Center Support team is available around the clock to assist you with any questions, updates, or delivery concerns—just give us a call or send an email!",
     isOpen: false,
   },
];

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
    const activeStyle = 'border-blue-800 bg-blue-200 text-blue-500';
    const defaultStyle = 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50';
    const contentHeight = isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0';

    return (
      <div 
        className={`mb-4 rounded-xl border p-4 transition-all duration-300  cursor-pointer ${isOpen ? activeStyle : defaultStyle}`} 
        onClick={toggleOpen}
      >
          <div className="flex justify-between items-center font-semibold">
              <p className="text-base md:text-lg">{question}</p>
              {isOpen ? <FaChevronUp className="text-sm transition-transform duration-300" /> : <FaChevronDown className="text-sm transition-transform duration-300" />}
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${contentHeight}`}>
              <div className={`mt-4 pt-3 border-t-2 border-opacity-30 ${isOpen ? 'border-[#b2dfdb]' : 'border-transparent'}`}>
                 <p className={`text-sm md:text-base font-normal ${isOpen ? 'text-[#37474f]' : 'text-gray-600'}`}>
                    {answer}
                 </p>
              </div>
          </div>
      </div>
    );
};

export default function Section4() {
    const [faqs, setFaqs] = useState(faqData);

    const toggleFAQ = (id) => {
      setFaqs(faqs.map(item => ({
          ...item,
          isOpen: item.id === id ? !item.isOpen : false, 
      })));
    };

    return (
      <div className="py-16 md:py-24 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-400 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Frequently Asked <span className="text-blue-400">Questions</span>
                 </h2>
                 <p className="text-gray-600 max-w-2xl mx-auto">
                    Find quick answers to common questions about ordering, delivery, and support from Shopnex.
                 </p>
              </div>

              <div className="space-y-4">
                 {faqs.map(faq => (
                    <FAQItem
                        key={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={faq.isOpen}
                        toggleOpen={() => toggleFAQ(faq.id)}
                    />
                 ))}
              </div>

              <div className="flex justify-center mt-12">
                 <button className="flex items-center  space-x-3 px-6 py-3 bg-blue-400 text-[#1F1F1F] font-semibold rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-0.5">
                    <span>See More FAQ's</span>
                 </button>
              </div>

          </div>
      </div>
    );
}