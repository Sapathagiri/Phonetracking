import React from 'react';
import { Phone, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = localStorage.getItem('isLogin') === '1';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                  <span className="block">Track Phone Numbers</span>
                  <span className="block text-blue-600">With Precision</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl sm:max-w-xl sm:mx-auto lg:mx-0">
                  Get detailed information about any phone number, including location, carrier, and more. Accurate tracking with respect for privacy.
                </p>
                <div className="mt-5 sm:mt-8 flex justify-center lg:justify-start">
                  {isLoggedIn ? (
                    <Link to="/track" className="rounded-md shadow">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Start Tracking
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login" className="rounded-md shadow">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to track a phone number
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Carrier Information
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Get detailed information about the carrier of any phone number.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Location Tracking
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Precise location tracking with Google Maps integration.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Privacy First
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Secure and private tracking with user consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
