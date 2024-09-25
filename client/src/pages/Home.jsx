import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { Carousel } from "flowbite-react";


export default function Home() {

  const [dayListings, setDayListings] = useState([]);
  const [hourListings, setHourListings] = useState([]);
  SwiperCore.use([Navigation])
  
  

  useEffect(() => {

    const fetchHourListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=hour&limit=3');
        const data = await res.json();
        setHourListings(data);
        fetchDayListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDayListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=day&limit=3');
        const data = await res.json();
        setDayListings(data);
        
      } catch (error) {
        console.log(error);
      }
    };


    fetchHourListings();
  }, [])

  return (
    <div className='min-h-screen'>
      {/* top */}
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h1 className=
      'text-3xl font-bold lg:text-6xl'>Welcome to the website</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>This webiste will help you to find the workers such as plumber, mechanics, catering, doctors and driver 
        <br />that you required on the basis of day and hours.</p>

      <Link to='/workers' className='text-xs sm:text-xs text-teal-500
      font-bold hover:underline dark:text-blue-800'>View available posts</Link>
    </div>
      {/* swiper */}

      <div className="h-[600px] border border-gray-600 rounded-lg" >
      <Carousel pauseOnHover>
        <img src="https://firebasestorage.googleapis.com/v0/b/college-project-7295c.appspot.com/o/1726843029388Leonardo_Phoenix_A_bright_yellow_sunflower_with_a_large_dark_c_1.jpg?alt=media&token=8cf9ecfe-9f4a-4b22-8055-9eaad1aa09c2" alt="..." />
        <img src="https://firebasestorage.googleapis.com/v0/b/college-project-7295c.appspot.com/o/1727257122527Leonardo_Phoenix_A_sweeping_western_landscape_set_against_a_vi_3.jpg?alt=media&token=5a666f42-2838-4636-a340-a1c0ce33a36c" alt="..." />
        <img src="https://firebasestorage.googleapis.com/v0/b/college-project-7295c.appspot.com/o/1727253106250Leonardo_Phoenix_A_sleek_silver_aero_plane_soars_through_a_vib_2.jpg?alt=media&token=833beb4b-b028-4589-9d00-0fe6e5304d8c" alt="..." />
        <img src="https://firebasestorage.googleapis.com/v0/b/college-project-7295c.appspot.com/o/1727253087367_DSC0076.JPG?alt=media&token=5f28bc82-1dda-4939-a2d1-d0057babd40f" alt="..." />
       
      </Carousel>
    </div>

{/* <Swiper navigation>
        {dayListings &&
          dayListings.length > 0 &&
          dayListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[600px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* lists results */}

          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          
          {hourListings && hourListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent posts for hourly worker</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=hour'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {hourListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

{dayListings && dayListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent posts for day</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=day'}>Show more posts for day</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {dayListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

          </div>

    </div>
  )
}
