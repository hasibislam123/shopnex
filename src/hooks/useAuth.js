// Hooks/useAuth.js
import { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';

export default function useAuth() {
   const [user, setUser] = useState(null);

   const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
   const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
   const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);
   const googleLogin = () => signInWithPopup(auth, googleProvider);
   const logout = () => signOut(auth);

   return { user, registerUser, loginUser, updateUserProfile, googleLogin, logout };
}