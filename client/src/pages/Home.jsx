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

      <div className="h-[768px]  border border-gray-600 rounded-lg" >
      <Carousel pauseOnHover>
        <img src="https://github.com/iAmVip1/mern-project/blob/main/images/test/Leonardo_Phoenix_A_middleaged_bus_driver_with_a_warm_gentle_sm_1.jpg?raw=true" alt="..." />
        <img src="https://github.com/iAmVip1/mern-project/blob/main/images/home%20page/Leonardo_Phoenix_A_smiling_black_male_doctor_in_his_mid40s_wit_1.jpg?raw=true" alt="..." />
        <img src="https://cdn.leonardo.ai/users/93a77815-3631-4894-bff3-e76521e61b6b/generations/f08e1d9f-6d37-449a-9cd6-98a214e84ecf/Leonardo_Phoenix_A_warm_and_inviting_photograph_of_a_catering_1.jpg" alt="..." />
        <img src="https://github.com/iAmVip1/mern-project/blob/main/images/home%20page/Leonardo_Phoenix_A_warm_and_inviting_scene_of_a_skilled_mechan_3.jpg?raw=true" alt="..." />
        <img src="https://cdn.leonardo.ai/users/93a77815-3631-4894-bff3-e76521e61b6b/generations/856270e9-c382-45e9-99e2-c689e351e3cc/Leonardo_Phoenix_A_mature_plumber_in_his_mid40s_with_a_rugged_2.jpg" alt="..." />
       
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
