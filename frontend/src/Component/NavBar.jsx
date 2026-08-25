import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModel";

// images import 
import logo from "../assets/new-pw-logo-white-618259573a0604d3ae593b46213e2ab390bcc33336d4bdc3486405c7351ded13.svg"

function NavBar() {
  const navigate = useNavigate();

  // input values
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // mobile filter (price) toggle 
  const [mobilePriceOpen, setMobilePriceOpen] = useState(false);

  // 2. Form submission handler
  const handleSearch = (e) => {
    e.preventDefault();
    // Build URL search parameters dynamically
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('keyword', keyword.trim());
    if (city) params.append('city', city);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    // Redirect user to: /search?keyword=,&city=, &minPrice=
    navigate(`/search?${params.toString()}`);
  };

  // User state from local storage
  const [user, setUser] = useState(null);

  // Using api to check user login check
  useEffect(() => {
    const checklogin = async () => {
      try {
        const result = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });
        if (result.ok) {
          const data = await result.json();
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(result);
        } else {
          setUser(null);
          localStorage.clear();
        }
      } catch (err) {
        console.log(err);
        throw new Error(`Error Something Went Wrong ${err.message}`);
      }
    };
    checklogin();
  }, []);

  // Logout route
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      localStorage.clear();
      setUser(null);
      navigate("/");
    }
  };

  // this is for add button
  const [isOpen, setIsOpen] = useState(false);

  // This is for signup and signin
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authmode, setauthmode] = useState("");

  const setSignup = () => {
    setauthmode("signup");
    setIsAuthOpen(true);
  };

  const setSignin = () => {
    setauthmode("signin");
    setIsAuthOpen(true);
  };

  return (
    // Full div that cover whole body
    <div className="bg-linear-to-b from-black via-[#001330] to-[#012b72] text-white min-h-fit lg:h-128">
      {/* this div cover internal things and aligen them in center */}
      <div className="max-w-292.5 mx-auto px-4 sm:px-6 lg:px-8">
        {/* this div join all signup and login */}
        <div className="flex items-center flex-wrap">
          <div className="text-white font-medium text-xs flex mt-2">
            <div>
              <svg
                className="text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <p className="mt-1 ml-1">Download App with SMS</p>
          </div>

          {/* Both Buttons Signup/Signin OR Logout */}
          <div className="ml-auto mt-3 text-xs flex items-center">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link to={"/mylisting"}>
                  <span className="font-medium text-gray-200 sm:inline">
                    Hi, {user.name || user.email || "User"}
                  </span>
                  <span className="font-medium text-gray-200 sm:hidden">
                    Hi
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="mr-2 sm:mr-4 border-l-2 border-gray-600 pl-2 cursor-pointer text-red-400 hover:text-red-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setSignup();
                  }}
                  className="mr-2 sm:mr-4 border-l-2 border-gray-600 pl-2 cursor-pointer"
                >
                  Sign Up
                </button>

                <button
                  onClick={() => {
                    setSignin();
                  }}
                  className="mr-2 sm:mr-4 border-l-2 border-gray-600 pl-2 cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
        {/* Auth here the signin and up popup */}
        <AuthModal
          isOpen={isAuthOpen}
          authmode={authmode}
          onClose={() => setIsAuthOpen(false)}
        />
        {/*  */}

        <hr className="text-gray-600 my-2" />

        {/* Cars button here */}
        <div className="flex items-center mt-4 gap-4">
          {/* Logo - left side */}
          <img
            className="h-8 w-32 sm:h-10 sm:w-40"
            src={logo}
            alt="Logo-Navbar"
          />

          {/* Nav links - only visible on large screens, centered in the middle */}
          <div className="hidden lg:flex flex-1 justify-center gap-4">
            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/usedcars"}
            >
              Used Cars
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/newcars"}
            >
              New Cars
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/bike"}
            >
              Bikes
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/more"}
            >
              More
            </Link>
          </div>

          {/* Post an Ad button - only visible on large screens, right side */}
          <div className="hidden lg:block relative">
            <button
              className="bg-[#b73439] flex items-center gap-2 px-4 py-2 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Post an Ad</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-33 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                <ul className="text-gray-700 text-sm py-1">
                  <li>
                    <Link to={'/car/create'} className="block px-4 py-2 hover:text-blue-600">
                      Sell a Car
                    </Link>
                  </li>
                  <li>
                    <Link to={"/bike/create"} className="block px-4 py-2 hover:text-blue-600">
                      Sell a Bike
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger button - only visible on small/medium screens, right side */}
          <button
            className="lg:hidden ml-auto p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu - only shows on small/medium screens when hamburger is clicked */}
        {mobileMenuOpen && (
          <div className="lg:hidden flex flex-col mt-2 gap-1">
            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/usedcars"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Used Cars
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/newcars"}
              onClick={() => setMobileMenuOpen(false)}
            >
              New Cars
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/bike"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Bikes
            </Link>

            <Link
              className="flex items-center h-12 px-4 hover:bg-white hover:text-red-600 transition-colors duration-650"
              to={"/more"}
              onClick={() => setMobileMenuOpen(false)}
            >
              More
            </Link>

            {/* Post an Ad button inside mobile menu */}
            <div className="relative mt-1">
              <button
                className="bg-[#b73439] flex items-center justify-center gap-2 px-4 py-2 rounded-md w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>Post an Ad</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg border border-gray-100 z-50">
                  <ul className="text-gray-700 text-sm py-1">
                    <li>
                      <Link to={'/car/create'} className="block px-4 py-2 hover:text-blue-600">
                        Sell a Car
                      </Link>
                    </li>
                    <li>
                      <Link to={"/bike/create"} className="block px-4 py-2 hover:text-blue-600">
                        Sell a Bike
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Heading hero here */}

        <div className="flex flex-col justify-center items-center mt-12 sm:mt-20 lg:mt-32 text-center text-white px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Find Used Cars in Pakistan
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-light text-gray-200 mt-2">
            With thousands of cars, we have just the right one for you
          </p>
        </div>

        {/* input tags */}

        {/* Form start here Filter */}
        <div className="w-full sm:w-11/12 md:w-3/4 lg:w-212 bg-white rounded-md p-1 mx-auto mt-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-center"
          >
            {/* Input 1: Car Make or Model */}
            <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-300 px-3 py-1">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Car Make or Model"
                className="w-full py-2 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>

            {/* Input 2: All Cities */}
            <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-300 px-3 py-1">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2 bg-transparent text-gray-500 focus:outline-none text-sm cursor-pointer"
              >
                <option value="" disabled className="text-gray-800">
                  All Cities
                </option>
                <option value="karachi">Karachi</option>
                <option value="lahore">Lahore</option>
                <option value="islamabad">Islamabad</option>
                <option value="rawalpindi">Rawalpindi</option>
                <option value="peshawar">Peshawar</option>
              </select>
            </div>

            {/* Input 3: Price Range Dropdown */}
            <div className="w-full sm:w-1/3 px-3 py-1 relative group">
              {/* Price selection */}
              <div
                className="flex items-center justify-between py-2 text-sm text-gray-500 cursor-pointer select-none"
                onClick={() => setMobilePriceOpen(!mobilePriceOpen)}
              >
                <span>Price Range</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    mobilePriceOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Min and max Price - click toggle on mobile, hover on sm+ */}
              <div
                className={`${
                  mobilePriceOpen ? "flex" : "hidden"
                } sm:group-hover:flex sm:group-focus-within:flex flex-col sm:flex-row static sm:absolute left-0 top-full w-full sm:w-72 bg-white rounded-md border border-gray-200 p-4 sm:z-50 gap-3`}
              >
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">
                    Min Price
                  </label>
                  <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-1.5 border border-gray-300 rounded text-xs text-gray-800 focus:outline-none focus:border-red-600"
                  >
                    <option value="" disabled>
                      Min
                    </option>
                    <option value="500000">5 Lacs</option>
                    <option value="1000000">10 Lacs</option>
                    <option value="2000000">20 Lacs</option>
                    <option value="3000000">30 Lacs</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">
                    Max Price
                  </label>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-1.5 border border-gray-300 rounded text-xs text-gray-800 focus:outline-none focus:border-red-600"
                  >
                    <option value="" disabled>
                      Max
                    </option>
                    <option value="1000000">10 Lacs</option>
                    <option value="2000000">20 Lacs</option>
                    <option value="5000000">50 Lacs</option>
                    <option value="10000000">1 Crore</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-[#B70000] hover:bg-[#960000] text-white p-3.5 rounded transition-colors duration-200 flex items-center justify-center shrink-0 cursor-pointer sm:ml-2 mt-2 sm:mt-0"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>
        </div>

        <div className="w-full mt-6 flex justify-center pb-4">
          <div className="border flex gap-2 p-1 px-8 text-sm cursor-pointer">
            Find More
            <img
              className="w-3 h-5"
              src="/src/assets/arrow_icon.svg"
              alt="Arrow Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;