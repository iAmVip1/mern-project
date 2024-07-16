import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage]= useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl 
      mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link 
        to="/" className='font-bold dark:text-white text-4xl'>
      <span className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600
       rounded-lg text-white '>Skills </span>
      Scout
      </Link>
      <p className='text-sm mt-5'>
        Please Login to continue.
      </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value='Username' />
              <TextInput type='text' placeholder='Username ' id='username'  onChange={handleChange}/> 
            </div>
            <div className="">
              <Label value='Email' />
              <TextInput type='email' placeholder='name@gmail.com ' id='email'  onChange={handleChange}/>
            </div>
            <div className="">
              <Label value='Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
            </div>





            <Button className='bg-gradient-to-r from-yellow-500 to-purple-600' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Submit'
              )}
              </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>
            Sign In
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
      </div>
  )
}