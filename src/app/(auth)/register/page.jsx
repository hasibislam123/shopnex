'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/";
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (data) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Upload photo to imgbb
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_KEY}`,
        formData
      );
      const photoURL = imgRes?.data?.data?.url;

      // Update Firebase profile
      await updateProfile(user, { displayName: data.name, photoURL });

      // Save to backend
      const userInfo = { email: data.email, displayName: data.name, photoURL };
      await axiosSecure.post("/users", userInfo);

      router.push(redirectPath);
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push(redirectPath);
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-base-100 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-2 text-center">Welcome to AskFlow</h2>
      <p className="text-center mb-4">Please Register</p>

      <form onSubmit={handleSubmit(handleRegistration)} className="flex flex-col gap-6">
        <div className="relative w-full pt-5">
          <input
            type="text"
            placeholder=" "
            {...register("name", { required: true })}
            className="peer w-full bg-transparent border-b-2 border-gray-400 text-[#03045e] text-lg py-2 placeholder-transparent focus:outline-none focus:border-b-4 focus:border-[#38caef] transition-all"
          />
          <label className="absolute left-0 top-2 text-gray-400 text-lg transition-all peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-[#38caef] peer-focus:text-base">
            Your Name
          </label>
          {errors.name && <p className="text-red-500 mt-1">Name is required.</p>}
        </div>

        <div className="relative flex justify-between border-b-2 border-gray-400 w-full py-3">
          <p className="px-5 py-2 text-gray-400">PHOTO</p>
          <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full" />
        </div>
        {errors.photo && <p className="text-red-500">Photo is required.</p>}

        <div className="relative w-full pt-5">
          <input
            type="email"
            placeholder=" "
            {...register("email", { required: true })}
            className="peer w-full bg-transparent border-b-2 border-gray-400 text-[#03045e] text-lg py-2 placeholder-transparent focus:outline-none focus:border-b-4 focus:border-[#38caef] transition-all"
          />
          <label className="absolute left-0 top-2 text-gray-400 text-lg transition-all peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-[#38caef] peer-focus:text-base">
            Email
          </label>
          {errors.email && <p className="text-red-500 mt-1">Email is required.</p>}
        </div>

        <div className="relative w-full pt-5">
          <input
            type="password"
            placeholder=" "
            {...register("password", { required: true, minLength: 6 })}
            className="peer w-full bg-transparent border-b-2 border-gray-400 text-[#03045e] text-lg py-2 placeholder-transparent focus:outline-none focus:border-b-4 focus:border-[#38caef] transition-all"
          />
          <label className="absolute left-0 top-2 text-gray-400 text-lg transition-all peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-[#38caef] peer-focus:text-base">
            Password
          </label>
          {errors.password && <p className="text-red-500 mt-1">Password is required.</p>}
        </div>

        <button type="submit" className="group grid place-items-center bg-[#e3edf7] text-black font-bold rounded-lg py-2 shadow-md hover:shadow-inner hover:translate-y-1 transition-all">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="text-center py-2">OR</div>

      <button onClick={handleGoogle} className="group grid place-items-center bg-[#e3edf7] text-black font-bold rounded-lg py-2 shadow-md hover:shadow-inner hover:translate-y-1 transition-all w-full">
        Sign in with Google
      </button>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-[#CAEB66] underline">Login</a>
      </p>
    </div>
  );
}
