import React from 'react'
import { Link } from 'react-router-dom'

export default function Agreement() {
  return (
    <div className='min-h-screen flex justify-center'>
        <div className="max-w-2xl mx-auto p-3 text-black dark:text-white">
        <div >
        <h1 className="text-center font-semibold text-3xl
      my-7">
        WEBSITE DISCLAIMER</h1>

        <div className="text-md flex flex-col gap-6">
        <p className='text-justify'>
          Thank you for visiting <span className='font-semibold'>SkillScout</span> (A platform for workers). 
        </p>
        <p className='text-justify'>
        This disclaimer is a legally binding agreement between you 
         and this us .
         It sets forth the general guidelines, disclosures, and terms of your use of this
          website operated by Skills Scout.
        </p>
        <p className='text-justify'>
        Please read this disclaimer carefully before continuing to use this website.
         Do not access and use the site if you do not agree to the terms of this disclaimer. 
         By using this website or its services, you acknowledge that you have thoroughly read and
          also understand the terms of this disclaimer and hereby agree to be bound thereof.
        </p>
        
        <h2 className='font-semibold text-2xl'>Disclaimer</h2>
        <p className='text-justify'>
        The information or content displayed on this website is the intellectual property of the 
        [Skills Scout (A platform for workers)]. You may not reuse, republish, or reprint such information 
        or content without our consent.
        </p>
        <p className='text-justify'>
        As a result, [Skills Scout (A platform for workers)], its partners, employees, or 
        agents will not be held liable for any accruing loss or damage as a result of the use 
        of, reliance on, and reference to our website, including without limitation, any special or 
        incidental, direct or indirect, and punitive, or consequential loss or damage whatsoever.
        </p>
        <p className='text-justify'>
        At [Skills Scout (A platform for workers)], we make every effort to keep the website 
        running smoothly. However, we take no legal responsibility and will not be liable if the 
        website is temporarily unavailable or inaccessible due to technical malfunctions beyond our control.
        </p>

        <h2 className='font-semibold text-2xl'>Terms and condition:</h2>

        <p className='text-justify'>
        <span className='font-semibold'>
        •	The document must be original.</span> <br />
        <span className='font-semibold'>
        •	Your age must be above 18.</span> <br />
        <span className='font-semibold'>
        •	You should have skill and experience to work in the website.</span> <br />
        <span className='font-semibold'>
        •	Must do the job if you've been contacted or selected. </span> <br />
        <span className='font-semibold'>
        •	The fee to continue for work is Rs 300.</span> <br />
        </p>
        <Link className='bg-blue-500 p-3 rounded-lg uppercase text-center hover:opacity-70 text-white' 
         to={"/create-application"}>
            Agree & Continue
         </Link>
        </div>
        </div>
        </div>
    </div>
  )
}
