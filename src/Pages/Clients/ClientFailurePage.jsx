import React from 'react';
import ClientNavbar from '../../Components/Clients/ClientNavbar';
import { Link } from 'react-router-dom';

function ClientFailurePage() {
  return (
    <>
      <div>
        <ClientNavbar />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="border p-6 rounded-lg shadow-lg text-center animate-fadeIn">
          <svg
            className="w-20 h-20 mx-auto mb-4 text-red-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment Failed
          </h2>
          <p className="text-white mb-4">
            Sorry, your payment was not successful. Please try again later.
          </p>
          <Link
            to="/user/home"
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default ClientFailurePage;
