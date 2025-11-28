'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { auth, googleProvider } from '../../../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter, useSearchParams,   } from 'next/navigation';

export default function Login() {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const router = useRouter();
   const searchParams = useSearchParams();
   const redirectPath = searchParams.get('from') || '/';

   // Email + Password Login
   const handleLogin = async (data) => {
      try {
         await signInWithEmailAndPassword(auth, data.email, data.password);
         router.push(redirectPath);
      } catch (error) {
         console.error('Login error:', error.message);
      }
   };

   // Google Login
   const handleGoogleSignIn = async () => {
      try {
         await signInWithPopup(auth, googleProvider);
         router.push(redirectPath);
      } catch (error) {
         console.error('Google login error:', error.message);
      }
   };

   return (
      <div className="p-6 max-w-sm mx-auto bg-base-100 rounded-lg shadow-md mt-10">
         <h2 className="text-3xl font-bold mb-2 text-center">Please Login</h2>

         <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">

            {/* EMAIL FIELD */}
            <div className="relative w-full pt-5">
               <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="peer w-full bg-transparent border-b-2 border-gray-400 text-[#03045e] text-lg py-2 placeholder-transparent focus:outline-none focus:border-b-4 focus:border-[#38caef] transition-all duration-200"
               />
               <label className="absolute left-0 top-2 text-gray-400 text-lg transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-[#38caef] peer-focus:text-base">
                  Enter your email
               </label>
               {errors.email && <p className="text-red-500 mt-1">Email is required.</p>}
            </div>

            {/* PASSWORD FIELD */}
            <div className="relative w-full pt-5">
               <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                  className="peer w-full bg-transparent border-b-2 border-gray-400 text-[#03045e] text-lg py-2 placeholder-transparent focus:outline-none focus:border-b-4 focus:border-[#38caef] transition-all duration-200"
               />
               <label className="absolute left-0 top-2 text-gray-400 text-lg transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-[#38caef] peer-focus:text-base">
                  Enter your password
               </label>
               {errors.password && <p className="text-red-500 mt-1">Password is required.</p>}
            </div>

            {/* LOGIN BUTTON */}
            <button
               type="submit"
               className="bg-[#e3edf7] text-black font-bold rounded-lg py-2 shadow-md hover:shadow-inner hover:translate-y-1 transition-all duration-300"
            >
               Login
            </button>
         </form>

         <div className="text-center p-3">OR</div>

         {/* GOOGLE SIGN-IN BUTTON */}
         <button
            onClick={handleGoogleSignIn}
            className="bg-[#e3edf7] text-black font-bold w-full py-2 rounded-lg shadow-md hover:shadow-inner hover:translate-y-1 transition-all duration-300"
         >
            Sign in with Google
         </button>

         <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#CAEB66] underline">
               Register
            </a>
         </p>
      </div>
   );
}
