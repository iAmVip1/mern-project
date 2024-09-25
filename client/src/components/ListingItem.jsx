import { Link } from "react-router-dom";
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

export default function ListingItem({ listing}) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]
    ">
    <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="Cover photo"
        className="h-[320px] sm:h-[220px] w-full object-cover
        hover:scale-105 transition-scale duration-300 dark:text-black"
        />
        <div className=" p-3 flex flex-col gap-2 w-full dark:text-black">
            <p className="text-lg font-semibold truncate"
            >{listing.name}</p>
            <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="h-4 w-4 text-green-700" />
                <p className="text-sm font-semibold truncate w-full"
            >{listing.address}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2"
            >{listing.description}</p>
            <p className=" text-gray-600 font-semibold mt-2
            flex items-center
            ">
                Rs.
                {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'hour' && ' / Per Hour'}
                {/* {listing.type === 'day' && ' / Per Day'} */}
            </p>
            <div className="text-slate-700 flex flex-wrap gap-4">
                <div className="font-bold text-xs">
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
        </div>
    </Link>
    </div>
  )
}
