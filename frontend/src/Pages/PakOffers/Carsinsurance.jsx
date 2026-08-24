import React, { useState } from 'react';

const Carinsurance = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      {/* Header Banner */}
      <div className="bg-[#233d7b] text-white py-12 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="bg-red-600 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
            New Feature
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 mb-3">
            Car Insurance Is Coming Soon
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We are working on bringing you the most competitive car insurance quotes, instant policy issuance, and hassle-free claims—all in one place.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-12 w-full">
        {/* Subscription Box */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-10 border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-15   h-12 bg-blue-50 text-[#233d7b] rounded-full mb-4">
            <img src="/src/assets/insurance.png" alt="Insurance Img" />      
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Get Notified When We Launch</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email to receive early access and exclusive launch discounts on your first policy.
          </p>

          {subscribed ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-md font-medium text-sm">
              Thank you! We'll notify you as soon as Car Insurance goes live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2=- focus:ring-[#233d7b]"
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:bg-blue-300 transition-bg duration-1000">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 rounded-full mb-3">
              <img src="/src/assets/bell.png" alt="Bell-Icons" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Instant Coverage</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Compare rates from top insurance partners and get instant coverage online.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:bg-blue-300 transition-bg duration-1000">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 text-[#233d7b] rounded-full mb-3">
              <img src="/src/assets/open-folder.png" alt="Files" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Paperless Process</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Zero physical paperwork required. Upload documents directly from your phone.
            </p>
          </div>

          <div className="bg-white p-6  rounded-lg border border-gray-200 text-center hover:bg-blue-300 transition-bg duration-1000">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 text-green-600 rounded-full mb-3">
              <img src="/src/assets/award-symbol.png" alt="Award_icon" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Best Rate Guarantee</h3>
            <p className="text-gray-500 text-xs ">
              Transparent pricing with no hidden charges or extra broker fees.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <div className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} YourCarApp. All rights reserved.
      </div>
    </div>
  );
};

export default Carinsurance;