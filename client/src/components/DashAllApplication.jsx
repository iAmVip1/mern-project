import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Table, Button } from 'flowbite-react';

export default function DashAllApplication() {
  const {currentUser} = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState ([])
  const [userApplications, setUserApplications] = useState ([])
  console.log(userPosts);
  
  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/application/get/`)
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
      <h1 className='text-center text-2xl font-semibold '>User's Application</h1>
    </div>
      {/* <Table >
      
      </Table> */}
    {currentUser.isAdmin && userApplications.length > 0 ? (
        <div className=''>
        <Table hoverable className='shadow-md'>
        <Table.Head>
        <Table.HeadCell> Applied Date </Table.HeadCell>
        <Table.HeadCell> Image </Table.HeadCell>
        <Table.HeadCell> Full Name </Table.HeadCell>
        <Table.HeadCell> User Email </Table.HeadCell>
        <Table.HeadCell> Application ID </Table.HeadCell>
        <Table.HeadCell> Send Mail </Table.HeadCell>
        <Table.HeadCell> Delete </Table.HeadCell>
        
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
            src={application.userImage}
            alt='Cover photo'
            className='w-20 h-10 object-contain bg-gray-500'
            />
            </Link>
          </Table.Cell>
          <Table.Cell>
            <p className='font-semibold'>{application && `${application.fname} ${application.mname} ${application.lname}`}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{application.userMail}</p>
          </Table.Cell>
          <Table.Cell>
          <p className=''>{application._id}</p>
          </Table.Cell>
          <Table.Cell>
          <Link
          to={`mailto:${application.userMail}?subject=Application No. ${application._id}&body=
          ${application.fname} ${application.mname} ${application.lname} Your application is verified`}
          className='bg-gradient-to-r from-green-500 to-indigo-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-70'
          >
            Send Mail          
          </Link>
          </Table.Cell>
          <Table.Cell>
            <button onClick={() => handleApplicationDelete(application._id)}
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
    
        <p className='text-center text-2xl font-semibold '>No applications </p> 
    )    
  }
 
      </div>
  
}