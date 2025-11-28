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
import { auth } from "../lib/firebase"; // নিশ্চিত করুন এই পাথটি সঠিক
import { AuthContext } from "./AuthContext"; // নিশ্চিত করুন এই পাথটি সঠিক

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user
    // 💡 ফিক্স: setLoading(false) সরানো হয়েছে, যেন কলিং কম্পোনেন্ট হ্যান্ডেল করতে পারে।
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); 
    };

    // Sign in with email/password
    const signinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    };

    // Sign in with Google
    // 💡 ফিক্স: আগের মতো, শুধু প্রমিস রিটার্ন করা হলো।
    const signinGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false));
    };

    // Log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    };

    // Update user profile
    const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Initial load check ends here
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

    // Optional: Show loading screen during initial check
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Authenticating...</div>;
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;