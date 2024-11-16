import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import ListingItem from '../components/ListingItem';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    // const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams();

    // recommend in posts
    const [dayListings, setDayListings] = useState([]);
    const [hourListings, setHourListings] = useState([]);
    const [medicalListings, setMedicalListings] = useState([]);
    const [electricianListings, setElectricianListings] = useState([]);
    const [driverListings, setDriverListings] = useState([]);
    const [cateringListings, setCateringListings] = useState([]);
    const [plumberListings, setPlumberListings] = useState([]);
    const [civilEngineerListings, setCivilEngineerListings] = useState([]);

    // recommend in ends here

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
                fetchDayListings()
            } catch (error) {
                setError(true)
                setLoading(false);
            }
        }
        const fetchDayListings = async () => {
          try {
            const res = await fetch('/api/listing/get?mechanics=true&limit=3');
            const data = await res.json();
            setDayListings(data);
            fetchHourListings();
          } catch (error) {
            console.log(error);
          }
        };
        const fetchHourListings = async () => {
          try {
            const res = await fetch('/api/listing/get?uncategorized=true&limit=3');
            const data = await res.json();
            setHourListings(data);
            fetchPlumberListings();
          } catch (error) {
            console.log(error);
          }
        };
        
        const fetchPlumberListings = async () => {
          try {
            const res = await fetch('/api/listing/get?plumber=true&limit=3');
            const data = await res.json();
            setPlumberListings(data);
            fetchMedicalListings();
          } catch (error) {
            console.log(error);
          }
        };
        const fetchMedicalListings = async () => {
          try {
            const res = await fetch('/api/listing/get?medical=true&limit=3');
            const data = await res.json();
            setMedicalListings(data);
            fetchCateringListings();
          } catch (error) {
            console.log(error);
          }
        };
        const fetchCivilEngineerListings = async () => {
          try {
            const res = await fetch('/api/listing/get?civilEngineer=true&limit=3');
            const data = await res.json();
            setCivilEngineerListings(data);
            
          } catch (error) {
            console.log(error);
          }
        };
        const fetchElectricianListings = async () => {
          try {
            const res = await fetch('/api/listing/get?electrician=true&limit=3');
            const data = await res.json();
            setElectricianListings(data);
            fetchCivilEngineerListings();
          } catch (error) {
            console.log(error);
          }
        };
        const fetchDriverListings = async () => {
          try {
            const res = await fetch('/api/listing/get?driver=true&limit=3');
            const data = await res.json();
            setDriverListings(data);
            fetchElectricianListings()
          } catch (error) {
            console.log(error);
          }
        };
        const fetchCateringListings = async () => {
          try {
            const res = await fetch('/api/listing/get?catering=true&limit=3');
            const data = await res.json();
            setCateringListings(data);
            fetchDriverListings();
          } catch (error) {
            console.log(error);
          }
        };
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
            <Button className='bg-gradient-to-r from-cyan-500 to-blue-500 uppercase ' outline
            onClick={() => setContact(true)}>
              Contact User
            </Button>
              )
            }
            {contact && <Contact listing={listing} />}
          </div>
          <CommentSection listingId={listing._id} />

            {/* recommendation ui */}

          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            
            {/* mechanics */}
            <div className="">
              
          {
                    listing.mechanics && (
                        <div className="">
                          {dayListings && dayListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Mechanics </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?mechanics=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {dayListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>

            {/* plumber */}
            <div className="">
              
          {
                    listing.plumber && (
                        <div className="">
                          {plumberListings && plumberListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Plumber </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?plumber=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {plumberListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* civilEngineer */}
            <div className="">
              
          {
                    listing.civilEngineer && (
                        <div className="">
                          {civilEngineerListings && civilEngineerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Civil Engineer </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?civilEngineer=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {civilEngineerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* medical */}
            <div className="">
              
          {
                    listing.medical && (
                        <div className="">
                          {medicalListings && medicalListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Medical </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?medical=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {medicalListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* electrician */}
            <div className="">
              
          {
                    listing.electrician && (
                        <div className="">
                          {electricianListings && electricianListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Electrician </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?electrician=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {electricianListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* driver */}
            <div className="">
              
          {
                    listing.driver && (
                        <div className="">
                          {driverListings && driverListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Driver </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?driver=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {driverListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* catering */}
            <div className="">
              
          {
                    listing.catering && (
                        <div className="">
                          {cateringListings && cateringListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Catering </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?catering=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {cateringListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          

            {/* uncategorized */}
            <div className="">
              
          {
                    listing.uncategorized && (
                        <div className="">
                          {hourListings && hourListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>More related posts for Uncategorized </h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?uncategorized=true'}>Show more </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {hourListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
              
            </div>
          </div>
        )}
                        </div>
                    )
                }
            </div>
          
          </div>
        </div>
        
        }
    </main>
  )
}
