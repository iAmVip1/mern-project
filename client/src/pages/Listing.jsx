import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaPhoneAlt ,
    FaChair,
    FaMapMarkerAlt,
    FaBriefcaseMedical, 
    FaShare,
  } from 'react-icons/fa';
  import { FaScrewdriverWrench } from "react-icons/fa6";
  import { MdPlumbing, MdElectricBolt, MdEngineering  } from "react-icons/md";
  import { GiSteeringWheel, GiPartyFlags  } from "react-icons/gi";
  import { GrStatusUnknown } from "react-icons/gr";
  import { Button } from "flowbite-react";
import Contact from '../components/Contact';
import CommentSection from '../components/CommentSection';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    // const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() =>{
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch    
                (`/api/listing/get/${params.listingId}`);
                const data = await res.json()            ;
                if (data.success === false) {
                    setError(true)
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true)
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);
    
    
  return (
    <main className='min-h-screen mt-5'>
        {loading && <p className='text-center my-7 text-2xl' >Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'> Something went wrong!!! </p>}
        {listing && !loading && !error && 
        <div>
        <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover'
                    // backgroundSize: 'contain'
                    ,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className='fixed top-[13%] left-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 dark: text-black'>
              Link copied!
            </p>
          )} */}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
          <p className='text-2xl font-semibold'>
              {listing.name} - Rs{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'Hour' && ' / Day'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm dark:text-white'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className="">
            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 mb-6 gap-2 rounded-md'>
                {listing.type === 'hour' ? 'Per Hour' : 'Per Day'}
              </p>

              <p className='text-slate-800 dark:text-white'>
              <span className='font-semibold text-black dark:text-white'>Description - </span>
              {listing.description}
            </p>
           
            {
              currentUser &&  (

            <ul className='text-blue-800 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 dark:text-green-700 '>
            <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaPhoneAlt className='text-lg mt-6' />
                <p className='text-black font-semibold dark:text-white mt-6 ml-1'>{listing.phoneNumber}</p>
              </li>
             </ul>
              )}
             {/* <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-3 dark:text-white'>

             <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.plumber ? 'Plumber' : ''}
              </li>
              
              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.medical ? 'Medical' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.mechanics ? 'Mechanics' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.electrician ? 'Electrician' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.driver ? 'Driver' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.civilEngineer ? 'Civil Engineer' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.catering ? 'Catering' : ''}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                
                {listing.uncategorized ? 'Uncategorized' : ''}
              </li>

             </ul>
              */}

    <div className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-3 dark:text-white'>
                
                {
                    listing.plumber && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <MdPlumbing /> Plumber
                        </p>
                    )
                }              
              
              {
                    listing.medical && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <FaBriefcaseMedical  /> Medical
                        </p>
                    )
                }

{
                    listing.mechanics && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <FaScrewdriverWrench /> Mechanics
                        </p>
                    )
                }

{
                    listing.electrician && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <MdElectricBolt  /> Electrician
                        </p>
                    )
                }

{
                    listing.driver && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <GiSteeringWheel /> Driver
                        </p>
                    )
                }

{
                    listing.civilEngineer && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <MdEngineering  /> Civil Engineer
                        </p>
                    )
                }

{
                    listing.catering && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <GiPartyFlags  /> Catering
                        </p>
                    )
                }

{
                    listing.uncategorized && (
                        <p className='flex items-center gap-2 whitespace-nowrap' >
                            <GrStatusUnknown  /> Uncategorized
                        </p>
                    )
                }

             </div>           
            </div>
            {
              currentUser && listing.userRef !== currentUser._id && !contact && (
            <Button className='bg-gradient-to-r from-cyan-500 to-blue-500 uppercase w-40 ' outline
            onClick={() => setContact(true)}>
              Contact User
            </Button>
              )
            }
            {contact && <Contact listing={listing} />}
          </div>
          <CommentSection listingId={listing._id} />
        </div>
        }
    </main>
  )
}
