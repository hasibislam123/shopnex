'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { usePathname } from "next/navigation"; // <-- Active route detect

const publicRoutes = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const privateRoutes = [
  { name: 'Add Product', path: '/addproduct' },
  { name: 'Manage Products ', path: '/menageproducts' }
];

export default function Navbar() {
  const pathname = usePathname(); // <-- get current route

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: '',
    email: '',
    photoURL: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          isLoggedIn: true,
          username: currentUser.displayName || 'User',
          email: currentUser.email,
          photoURL: currentUser.photoURL || 'https://i.ibb.co/5GzXkwq/user-placeholder.png'
        });
      } else {
        setUser({
          isLoggedIn: false,
          username: '',
          email: '',
          photoURL: ''
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({
        isLoggedIn: false,
        username: '',
        email: '',
        photoURL: ''
      });
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(prev => !prev)}
        className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 hover:border-blue-500 transition"
      >
        <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full object-cover" />
        <span className="hidden md:inline font-medium">{user.username}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-2 border-b border-gray-100 px-4">
            <p className="text-sm font-semibold text-gray-900">{user.username}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <nav className="w-full sticky top-0 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-400 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          Shop<span className='text-[#2290f7]'>nex</span>
        </Link>

        {/* Mobile */}
        <div className="flex items-center md:hidden gap-3">
          {!isMenuOpen && (
            <div className="text-sm">
              {user.isLoggedIn ? <UserDropdown /> : <Link href="/login" className='text-blue-600 font-semibold'>Login</Link>}
            </div>
          )}
          <button
            aria-label="Toggle menu"
            className="text-2xl text-gray-700"
            onClick={() => { setIsMenuOpen(prev => !prev); if (isDropdownOpen) setIsDropdownOpen(false); }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          {publicRoutes.map(route => (
            <Link 
              key={route.name} 
              href={route.path}
              className={`px-3 py-2 rounded 
              ${pathname === route.path ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
            >
              {route.name}
            </Link>
          ))}

          {user.isLoggedIn && privateRoutes.map(route => (
            <Link 
              key={route.name} 
              href={route.path}
              className={`px-3 py-2 rounded 
              ${pathname === route.path ? "text-blue-600 font-semibold" : "hover:text-blue-600"}`}
            >
              {route.name}
            </Link>
          ))}

          <div className="pl-4 border-l border-gray-200">
            {user.isLoggedIn ? <UserDropdown /> : (
              <div className="flex items-center gap-3">
                <Link href="/login" className='px-3 py-2 text-blue-600 hover:text-blue-800 font-semibold'>Login</Link>
                <Link href="/register" className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3 font-medium">

          {publicRoutes.map(route => (
            <Link
              key={route.name}
              href={route.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded ${
                pathname === route.path ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {route.name}
            </Link>
          ))}

          {user.isLoggedIn && privateRoutes.map(route => (
            <Link
              key={route.name}
              href={route.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded ${
                pathname === route.path ? "text-blue-600 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {route.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100 space-y-2">
            {user.isLoggedIn ? (
              <>
                <p className="block px-3 py-2 text-sm font-semibold text-gray-700">Logged in as: {user.username}</p>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 text-red-600 hover:bg-gray-100 rounded w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className='block px-3 py-2 text-blue-600 hover:bg-gray-100 rounded font-semibold' onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/register" className='block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700' onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
