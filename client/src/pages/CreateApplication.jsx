import { Button } from 'flowbite-react'
import React from 'react'

export default function CreateApplication() {
  return (
    <main className='p-3 max-w-4xl mx-auto min-h-screen'>
        <h1 className=' text-3xl font-semibold text-center my-7 '>Application Form </h1>
        <form className='flex flex-col sm:flex-row gap-4' >
        <div className="flex flex-col gap-4 flex-1 ">
        <input type="text" placeholder='First Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='fname'

             required />

             <input type="text" placeholder='Middle Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='mname'
                         
             required />

             <input type="text" placeholder='Last Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='lname'
                         
             required />

            <input type="text" placeholder='Permanent Address' className='border-gray-300 p-3 rounded-lg text-black' id='paddress' 
           
            required />

            <input type="text" placeholder='Temporary Address' className='border-gray-300 p-3 rounded-lg text-black' id='taddress' 
           
            required />

            <input type="number" placeholder='Contact Number' 
            className='border-gray-300 p-3 rounded-lg text-black' 
            id='phoneNumber1' 
            
            required />

            <input type="number" placeholder='Contact Number 2' 
            className='border-gray-300 p-3 rounded-lg text-black' 
            id='phoneNumber2' 
           
            required />

        </div>
        <div className="flex flex-col flex-1 gap-4">
        <p className='font-semibold'>PDF:
            <span className='font-normal text-gray-500 ml-2'>Please upload your CV
                </span>    
            </p>
            <div className="flex gap-4">
            <input className='p-1 border border-gray-300 rounded w-full' 
                 type='file' id='cvFile' accept='pdf/*' />
                 <button type='button'
                
                 className='p-2 text-green-500 border border-green-700 rounded 
                uppercase hover:shadow-lg disabled:opacity-80' >
                    Upload
                    </button>
            </div>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-500 ml-2'>Please upload your certificates or license
                </span>    
            </p>
            <div className="flex gap-4">
                <input className='p-1 border border-gray-300 rounded w-full' 
                 type='file' id='images' accept='image/*' multiple />
                <button className='p-2 text-green-500 border border-green-700 rounded 
                uppercase hover:shadow-lg disabled:opacity-80' >Upload</button>
            </div>

            <Button className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' type='submit'  outline>
          Submit
         </Button>


        </div>
             </form>
        
        </main>
  )
}
