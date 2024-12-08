'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Toast from './Toast';

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [signUpCredentials, setSignUpCredentials] = useState({ username: '', password: '' });

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, []);

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
      router.push('/tasks'); // Redirect to tasks page after successful login
    } catch (error: any) {
      setToast({ type: 'error', message: error.message });
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
    setToast({ type: 'success', message: 'Logged out successfully' });
    router.push('/');
  };

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  // Close menu when resizing to a large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <header className="relative flex items-center p-4 bg-white shadow-md">
        {/* Left: Logo */}
        <div
          className="text-lg font-bold cursor-pointer"
          onClick={() => navigateToPage('/')}
        >
          Task Manager
        </div>

        {/* Center: Home & Tasks (visible on large screens and only if logged in) */}
        <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-center">
          {isUserLoggedIn && (
            <div className="flex space-x-4">
              <button
                className="text-gray-600 hover:text-blue-500"
                onClick={() => navigateToPage('/HomePage')}
              >
                Home
              </button>
              <button
                className="text-gray-600 hover:text-blue-500"
                onClick={() => navigateToPage('/tasks')}
              >
                Tasks
              </button>
            </div>
          )}
        </div>

        {/* Right: User Actions (visible on large screens) */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isUserLoggedIn ? (
            <>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full"
                onClick={openLoginModal}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-full"
                onClick={openSignUpModal}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-gray-200 rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="lg:hidden flex flex-col items-center justify-center space-y-1 ml-auto"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 mt-2 bg-white shadow-lg p-4 rounded-lg z-50 w-48">
            {isUserLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <button
                  className="text-gray-700 hover:text-blue-500 text-left"
                  onClick={() => {
                    navigateToPage('/HomePage');
                    setMenuOpen(false);
                  }}
                >
                  Home
                </button>
                <button
                  className="text-gray-700 hover:text-blue-500 text-left"
                  onClick={() => {
                    navigateToPage('/tasks');
                    setMenuOpen(false);
                  }}
                >
                  Tasks
                </button>
                <button
                  className="text-gray-700 hover:text-red-500 text-left"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <button
                  className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  onClick={() => {
                    openLoginModal();
                    setMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                  onClick={() => {
                    openSignUpModal();
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-80">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModals}
            >
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded shadow-lg w-80">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModals}
            >
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
