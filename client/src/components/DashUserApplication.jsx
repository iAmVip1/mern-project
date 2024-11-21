import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Table, Button } from 'flowbite-react';
import axios from 'axios';

export default function DashUserApplication() {
  const {currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState ([])
  const [userApplications, setUserApplications] = useState ([])
  console.log(userPosts);
  
  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/applications/${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
            setUserPosts(data.applications)
        }
        setUserApplications(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser._id) {
      fetchPosts();
    }
  }, [currentUser._id]
)
const buyFunction = async (currentUserId, applicationId) => {
  try {
    const response = await axios.post('http://localhost:3000/payment', {
      userId: currentUserId,
      applicationId: applicationId,
      email: currentUser.email, // Ensure you pass the email as Stripe needs it
    });
    if (response.status === 200) {
      window.open(response.data.url, '_blank');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
  }
};


  const handleApplicationDelete = async (applicationId) => {
    try {
      const res = await fetch(`/api/application/delete/${applicationId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      
      setUserApplications((prev) =>
      prev.filter((application) => application._id !== applicationId)
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
      <h1 className='text-center text-2xl font-semibold '>Your Application</h1>
    </div>
      {/* <Table >
      
      </Table> */}
    {userApplications && userApplications.length > 0 ? (
        <div className=''>
        <Table hoverable className='shadow-md'>
        <Table.Head>
        <Table.HeadCell> Applied Date </Table.HeadCell>
        <Table.HeadCell> Document </Table.HeadCell>
        <Table.HeadCell> First Name </Table.HeadCell>
        <Table.HeadCell> Last Name </Table.HeadCell>
        <Table.HeadCell> Application ID </Table.HeadCell>
        <Table.HeadCell> Delete </Table.HeadCell>
        <Table.HeadCell> 
        <span>Edit</span>  
        </Table.HeadCell>
        <Table.HeadCell> Application Payment </Table.HeadCell>
      </Table.Head>
      {userApplications.map((application) =>(
        <Table.Body className='divide-y' key={application._id}>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell>
            {new Date (application.updatedAt).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell>
          <Link to={`/application/${application._id}`}>
            <img 
            src={application.imageUrls}
            alt='Cover photo'
            className='w-20 h-10 object-cover bg-gray-500'
            />
            </Link>
          </Table.Cell>
          <Table.Cell>
            <p className='font-semibold'>{application.fname}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{application.lname}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{application._id}</p>
          </Table.Cell>
          <Table.Cell>
            <button onClick={() => handleApplicationDelete(application._id)}
             className='text-red-700 hover:underline'>
              Delete
            </button>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/update-application/${application._id}`}>
            <button className='text-green-500 hover:underline'>
              Edit
            </button>
            </Link>
          </Table.Cell>

          <Table.Cell>
       <Button onClick={() => buyFunction(currentUser._id, application._id)}>Pay Now</Button>
        </Table.Cell>

        </Table.Row>
      </Table.Body>
      ))}
        </Table>
        </div>
    ):(
    
        <p className='text-center text-2xl font-semibold '>You have no Application </p> 
    )    
  }
 
      </div>
  
}
