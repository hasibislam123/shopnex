'use client';

import React, { useEffect, useState } from "react";
import { 
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Register user
   const registerUser = async (email, password) => {
      setLoading(true);
      try {
         return await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
         if (error.code === "auth/email-already-in-use") {
            throw new Error("This email is already registered. Try logging in.");
         } else {
            throw new Error(error.message);
         }
      } finally {
         setLoading(false);
      }
   };

   // Sign in with email/password
   const signinUser = async (email, password) => {
      setLoading(true);
      try {
         return await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
         throw new Error(error.message);
      } finally {
         setLoading(false);
      }
   };

   // Sign in with Google
   const signinGoogle = async () => {
      setLoading(true);
      try {
         return await signInWithPopup(auth, googleProvider);
      } finally {
         setLoading(false);
      }
   };

   // Log out
   const logOut = async () => {
      setLoading(true);
      try {
         return await signOut(auth);
      } finally {
         setLoading(false);
      }
   };

   // Update user profile
   const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

   // Observe user state
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   const authInfo = {
      user,
      loading,
      registerUser,
      signinUser,
      signinGoogle,
      logOut,
      updateUserProfile
   };

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;