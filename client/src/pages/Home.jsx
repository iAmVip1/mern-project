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
        <img src="https://github.com/iAmVip1/mern-project/blob/main/images/test/Leonardo_Phoenix_A_middleaged_bus_driver_with_a_warm_gentle_sm_1.jpg?raw=true" alt="..." />
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e746e8fe-938b-4a91-a3eb-1cbdc6b76143/di8jfdr-9d6b6606-b768-466d-a0ce-615100443d99.jpg/v1/fit/w_828,h_474,q_70,strp/plumber_guy_plumbing_by_ambhooz_di8jfdr-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvZTc0NmU4ZmUtOTM4Yi00YTkxLWEzZWItMWNiZGM2Yjc2MTQzXC9kaThqZmRyLTlkNmI2NjA2LWI3NjgtNDY2ZC1hMGNlLTYxNTEwMDQ0M2Q5OS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.fhR9sKa9tgORb7b4Iw_ku17zlrIK7fMBcv6ban4zGb8" alt="..." />
        <img src="https://firebasestorage.googleapis.com/v0/b/college-project-7295c.appspot.com/o/1726843029388Leonardo_Phoenix_A_bright_yellow_sunflower_with_a_large_dark_c_1.jpg?alt=media&token=8cf9ecfe-9f4a-4b22-8055-9eaad1aa09c2" alt="..." />
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
