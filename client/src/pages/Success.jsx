import React from 'react';
import { TiTick } from "react-icons/ti";
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-800">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
            <TiTick className="text-white text-3xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-gray-600">Payment succeeded!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for processing your most recent payment.
          <br />
          You will receive an Email after we verify your application.
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
