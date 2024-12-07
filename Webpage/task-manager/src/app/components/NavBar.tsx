'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Toast from './toast';

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [signUpCredentials, setSignUpCredentials] = useState({ username: '', password: '' });

  // Toggle functions
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModals = () => {
    setLoginModalOpen(false);
    setSignUpModalOpen(false);
  };

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, []);

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginCredentials, action: 'login' }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUserLoggedIn(true);
      setToast({ type: 'success', message: 'Login successful' });
      closeModals();
    } catch (error: any) {
      setToast({ type: 'error', message: error.message });
    }
  };

  // Handle Sign-Up
  const handleSignUp = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signUpCredentials, action: 'signup' }),
      });

      if (!response.ok) {
        throw new Error('Sign-Up failed');
      }

      setToast({ type: 'success', message: 'Sign-Up successful' });
      closeModals();
    } catch (error: any) {
      setToast({ type: 'error', message: error.message });
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
    setToast({ type: 'success', message: 'Logged out successfully' });
    router.push('/');
  };

  return (
    <>
      {/* Toast Notifications */}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-lg font-bold cursor-pointer" onClick={() => router.push('/')}>
          Task Manager
        </div>

        {/* Navigation Links */}
        <nav className={`lg:flex items-center space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          {isUserLoggedIn && (
            <>
              <button className="text-gray-600 hover:text-blue-500" onClick={() => router.push('/HomePage')}>
                Home
              </button>
              <button className="text-gray-600 hover:text-blue-500" onClick={() => router.push('/tasks')}>
                Tasks
              </button>
            </>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {!isUserLoggedIn ? (
            <>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full" onClick={openLoginModal}>
                Login
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full" onClick={openSignUpModal}>
                Sign Up
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-gray-200 rounded-full" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-80">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModals}>
              ✕
            </button>
            <h2 className="text-lg font-bold">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded my-2"
              onChange={(e) => setLoginCredentials({ ...loginCredentials, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded my-2"
              onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      )}

      {/* Sign-Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-80">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModals}>
              ✕
            </button>
            <h2 className="text-lg font-bold">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded my-2"
              onChange={(e) => setSignUpCredentials({ ...signUpCredentials, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded my-2"
              onChange={(e) => setSignUpCredentials({ ...signUpCredentials, password: e.target.value })}
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded-full" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
