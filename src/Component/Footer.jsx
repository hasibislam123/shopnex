import React from 'react'
import Link from 'next/link'


export default function Footer() {
   return (
      <footer className="bg-black text-white py-10 mt-20">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
               <h2 className="text-2xl font-bold">Shops <span className='text-[#a2d2ff]'>nex</span></h2>
               <p className="text-gray-300 mt-3">Quality products at your doorstep.</p>
            </div>


            <div>
               <h3 className="font-semibold mb-3">Quick Links</h3>
               <ul className="space-y-2 text-gray-300">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
               </ul>
            </div>


            <div>
               <h3 className="font-semibold mb-3">Resources</h3>
               <ul className="space-y-2 text-gray-300">
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms & Conditions</Link></li>
                  <li><Link href="/faq">FAQ</Link></li>
               </ul>
            </div>


            <div>
               <h3 className="font-semibold mb-3">Contact</h3>
               <ul className="space-y-2 text-gray-300">
                  <li>Email: hasib64dj@gmail.com</li>
                  <li>Phone: +8801742394552</li>
                  <li>Address: Chandpur, Bangladesh</li>
               </ul>
            </div>
         </div>


         <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-5">
            © {new Date().getFullYear()} Shops <span className='text-[#a2d2ff]'>nex</span>. All Rights Reserved.
         </div>
      </footer>
   )
}