import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Table, Button } from 'flowbite-react';

export default function DashNewPosts() {
  const {currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState ([])
  const [userListings, setUserListings] = useState ([])
  console.log(userPosts);
  
  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/listing/get/`)
        const data = await res.json()
        if (res.ok) {
            setUserPosts(data.listings)
        }
        setUserListings(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser._id) {
      fetchPosts();
    }
  }, [currentUser._id]
)

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      
      setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
      );

    } catch (error) {
      console.log(error.message);
      
    }
  }

  return <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
   scrollbar-track-slate-100
    scrollbar-thumb-slate-300
     dark:scrollbar-track-slate-700
      dark:scrollbar-thumb-slate-500 
      '>
    <div className="">
      <h1 className='text-center text-2xl font-semibold '>User Posts</h1>
    </div>
      {/* <Table >
      
      </Table> */}
    {currentUser.isAdmin && userListings.length > 0 ? (
        <div className=''>
        <Table hoverable className='shadow-md'>
        <Table.Head>
        <Table.HeadCell> Date Updated </Table.HeadCell>
        <Table.HeadCell> Image </Table.HeadCell>
        <Table.HeadCell> Service Name </Table.HeadCell>
        <Table.HeadCell> Uploaded by </Table.HeadCell>
        <Table.HeadCell> Phone Number </Table.HeadCell>
        <Table.HeadCell> Delete </Table.HeadCell>
        
      </Table.Head>
      {userListings.map((listing) =>(
        <Table.Body className='divide-y' key={listing._id}>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell>
            {new Date (listing.updatedAt).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell>
          <Link to={`/listing/${listing._id}`}>
            <img 
            src={listing.imageUrls}
            alt='Cover photo'
            className='w-20 h-10 object-cover bg-gray-500'
            />
            </Link>
          </Table.Cell>
          <Table.Cell>
            <p className='font-semibold'>{listing.name}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{listing.userRef}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{listing.phoneNumber}</p>
          </Table.Cell>
          <Table.Cell>
            <button onClick={() => handleListingDelete(listing._id)}
             className='text-red-700 hover:underline'>
              Delete
            </button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      ))}
        </Table>
        </div>
    ):(
    
        <p className='text-center text-2xl font-semibold '>You have no posts </p> 
    )    
  }
 
      </div>
  
}
