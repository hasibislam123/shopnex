'use client';

import React, { useEffect, useState } from 'react';

const images = [
   "https://i.ibb.co/KT8tGdB/clem-onojeghuo-c4pbb7y-NM2c-unsplash.jpg",
   "https://i.ibb.co/Ps7QkyV5/becca-mchaffie-Fzde-6-ITjkw-unsplash.jpg",
   "https://i.ibb.co/8RnvDGM/anna-dziubinska-m-Vhd5-QVl-DWw-unsplash.jpg",
   "https://i.ibb.co/wFmjf4yK/jezael-melgoza-lay-Mb-SJ3-YOE-unsplash.jpg",
   "https://i.ibb.co/pjHw0810/heidi-fin-2-TLREZi7-BUg-unsplash.jpg",
   "https://i.ibb.co/4ng3qbjJ/freestocks-3-Q3ts-J01nc-unsplash.jpg"
];

export default function Banner() {
   const [currentIndex, setCurrentIndex] = useState(0);

   // Change image every 3 seconds
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="relative w-full 
    h-[300px]        
    sm:h-[350px]     
    md:h-[450px]     
    lg:h-[550px]    
    xl:h-[650px]     
    2xl:h-[700px]    
    overflow-hidden rounded-lg shadow-lg"
      >
         {images.map((img, index) => (
            <img
               key={index}
               src={img}
               alt={`banner-${index}`}
               className={`
        absolute top-0 left-0 w-full h-full object-cover 
        transition-opacity duration-1000
        ${index === currentIndex ? "opacity-100" : "opacity-0"}
      `}
            />
         ))}

         {/* Overlay Text */}
         
      </div>
   );
}