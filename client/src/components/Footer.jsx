import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';


export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="">
        <div className="">
          <div className="">
          <Link to="/" className='self-center 
      whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600
       rounded-lg text-white '>Skills </span>
      Scout
      </Link>
          </div>
        </div>
      </div>
      </Footer>
  )
}
