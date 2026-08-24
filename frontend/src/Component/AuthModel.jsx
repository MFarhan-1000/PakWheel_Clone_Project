import React, { useState, useEffect } from 'react';


// Base URL for the auth API — change this in one place when you deploy
const API_BASE_URL = 'http://localhost:3000';


function AuthModal({ isOpen, authmode = 'signin', onClose }) {
  const [isSignUp, setIsSignUp] = useState(authmode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
   
  // Helper to safely retrieve user from localStorage
  const getStoredUser = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') return null;
      return JSON.parse(savedUser);
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      return null;
    }
  };

  // Track authenticated user state locally from localStorage
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    setIsSignUp(authmode === 'signup');
    setError('');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');

    // Safely refresh user state when modal opens or mode changes
    setCurrentUser(getStoredUser());
  }, [authmode, isOpen]);

  if (!isOpen) return null;

  // Helper to store session and close modal
  const handleAuthSuccess = (data) => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
    }
// aleart here
    // alert(isSignUp ? 'Account created & signed in successfully!' : 'Signed in successfully!');
    onClose();
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isSignUp
      ? `${API_BASE_URL}/signup`
      : `${API_BASE_URL}/login`;

    const payload = isSignUp
      ? { name: fullName, email, phone, password }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // sends/receives httpOnly cookies
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      // Auto-signin for both signup and login
      handleAuthSuccess(data);

    } catch (err) {
      if(err){
        console.log(err)
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Signout handler: clears backend cookie & frontend localStorage
  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.clear();
      setCurrentUser(null);
      setLoading(false);
      // aleart message
      onClose();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1 rounded-full hover:bg-gray-100 transition"
        >
          ✕
        </button>

        {/* IF USER IS ALREADY SIGNED IN */}
        {currentUser ? (
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome, {currentUser.name || currentUser.email}!
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              You are currently signed in as <span className="font-semibold">{currentUser.email}</span>
            </p>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md transition duration-200 text-sm flex items-center justify-center"
            >
              {loading ? 'Signing Out...' : 'Sign Out / Logout'}
            </button>
          </div>
        ) : (
          /* IF USER IS NOT SIGNED IN */
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSignUp ? 'Create PakWheels Account' : 'Sign in to PakWheels'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {isSignUp
                  ? 'Sign up to post ads and manage your account'
                  : 'Access your ads, saved cars, and inquiries'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md text-left font-medium leading-relaxed">
                <span className="font-bold block mb-0.5">Authentication Error:</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ali Khan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XXXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#b70000] hover:bg-[#960000] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md transition duration-200 text-sm mt-2 flex items-center justify-center"
              >
                {loading ? 'Processing...' : isSignUp ? 'Register & Sign In' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-6 text-xs text-gray-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setIsSignUp(false);
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setIsSignUp(true);
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;