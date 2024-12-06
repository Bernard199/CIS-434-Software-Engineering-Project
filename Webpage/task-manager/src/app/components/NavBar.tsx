// Updating the NavBar component to represent the changes in user handling using service functions.

'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loginUser, createUser } from '../API/userService';
import Toast from './Toast';

export default function NavBar() {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ type: string, message: string } | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  // Toggle functions
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
    setLoginError(null);
  };
  const toggleSignUpModal = () => {
    setSignUpModalOpen(!isSignUpModalOpen);
    setSignUpError(null);
  };
  const toggleUserDropdown = () => setUserDropdownOpen(!isUserDropdownOpen);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-icon') && !target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };
    if (isUserDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  // Handle Login Function
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.access_token);
      setUserLoggedIn(true);
      setLoginModalOpen(false);
      setToast({ type: 'success', message: 'Login successful' });
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  // Handle Sign Up Function
  const handleSignUp = async (username: string, password: string) => {
    try {
      await createUser({ username, password });
      setSignUpModalOpen(false);
      setToast({ type: 'success', message: 'Sign up successful' });
    } catch (error: any) {
      setSignUpError(error.message);
    }
  };

  // Handle Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
    setToast({ type: 'success', message: 'Logout successful' });

    // Add a slight delay before redirecting to ensure the UI updates properly
    setTimeout(() => {
      if (window.location.pathname === '/Tasks') {
        router.push('/');
      }
    }, 300);
  };

  return (
    <>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
        <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
          {/* Logo Section */}
          <a onClick={() => router.push('/')} className="cursor-pointer">
            {/* <img src="" alt="logo" className='w-20' />  Add logo here */}
          </a>

          {/* Collapsible Menu */}
          <div id="collapseMenu" className={`${isMenuOpen ? 'block' : 'hidden'} lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}>
            <button id="toggleClose" className='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3' onClick={toggleMenu}>
              {/* SVG Icon for Menu Close */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
              </svg>
            </button>

            {/* Menu Items */}
            {isUserLoggedIn && (
              <ul className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                {[
                  { name: 'Home', path: '/HomePage' },
                  { name: 'Tasks', path: '/Tasks' },
                  // Commenting out the Projects tab for now
                  // { name: 'Projects', path: '/' }
                ].map((item, index) => (
                  <li key={index} className='max-lg:border-b border-gray-300 max-lg:py-3 px-3'>
                    <a onClick={() => { setMenuOpen(false); router.push(item.path); }} className='hover:text-[#007bff] text-gray-500 block font-semibold text-[15px] cursor-pointer'>{item.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Login, Sign Up, and User Icon */}
          <div className='flex max-lg:ml-auto space-x-3'>
            {!isUserLoggedIn ? (
              <>
                <button onClick={toggleLoginModal} className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] shadow-lg'>Login</button>
                <button onClick={toggleSignUpModal} className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] shadow-lg'>Sign Up</button>
              </>
            ) : (
              <div className='relative'>
                <button className='p-2 rounded-full bg-gray-200 shadow-lg user-icon' onClick={toggleUserDropdown}>
                  {/* User Icon */}
                  <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <path fillRule='evenodd' d='M10 2a6 6 0 100 12 6 6 0 000-12zM2 18a8 8 0 0116 0H2z' clipRule='evenodd'></path>
                  </svg>
                </button>
                {isUserDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg user-dropdown'>
                    <a onClick={handleLogout} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'>Logout</a>
                  </div>
                )}
              </div>
            )}

            <button id="toggleOpen" className='lg:hidden' onClick={toggleMenu}>
              {/* SVG Icon for Menu Open */}
              <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[400px] relative'>
              <button onClick={toggleLoginModal} className='top-2 right-2 text-gray-500 absolute'>X</button>
              <h2 className='text-xl font-bold mb-4'>Login</h2>
              <input type='text' placeholder='Username' id='login-username' className='w-full mb-3 p-2 border border-gray-300 rounded' />
              <input type='password' placeholder='Password' id='login-password' className='w-full mb-4 p-2 border border-gray-300 rounded' />
              {loginError && <p className='text-red-500 text-sm mb-3'>{loginError}</p>}
              <button onClick={() => handleLogin((document.getElementById('login-username') as HTMLInputElement)?.value || '', (document.getElementById('login-password') as HTMLInputElement)?.value || '')} className='w-full px-4 py-2 bg-[#007bff] text-white rounded hover:bg-transparent hover:text-[#007bff] border-2 border-[#007bff] transition-all duration-300'>Login</button>
            </div>
          </div>
        )}

        {/* Sign Up Modal */}
        {isSignUpModalOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-[400px] relative'>
              <button onClick={toggleSignUpModal} className='top-2 right-2 text-gray-500 absolute'>X</button>
              <h2 className='text-xl font-bold mb-4'>Sign Up</h2>
              <input type='text' placeholder='Username' id='signup-username' className='w-full mb-3 p-2 border border-gray-300 rounded' />
              <input type='password' placeholder='Password' id='signup-password' className='w-full mb-4 p-2 border border-gray-300 rounded' />
              {signUpError && <p className='text-red-500 text-sm mb-3'>{signUpError}</p>}
              <button onClick={() => handleSignUp((document.getElementById('signup-username') as HTMLInputElement)?.value || '', (document.getElementById('signup-password') as HTMLInputElement)?.value || '')} className='w-full px-4 py-2 bg-[#007bff] text-white rounded hover:bg-transparent hover:text-[#007bff] border-2 border-[#007bff] transition-all duration-300'>Sign Up</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
