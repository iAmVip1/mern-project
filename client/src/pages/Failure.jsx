import React from 'react';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';

export default function Failure() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-800">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center">
            <ImCross className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-600">Payment Failed!</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong while processing your Payment.
          <br />
          Please try again.
        </p>
        <Link to="/ "
          className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
          >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
