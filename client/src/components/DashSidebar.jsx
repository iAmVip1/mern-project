import React from 'react';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {Sidebar} from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiOutlineUserGroup} from 'react-icons/hi';
import { HiDocumentText } from "react-icons/hi2";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaBookReader, FaRegCommentAlt  } from "react-icons/fa";
import { FaWpforms, FaFileContract  } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";

export default function Dashsidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const handleSignout = async () =>{
      try {
        const res = await fetch('/api/user/signout', 
          {
            method: 'POST'
  
          }  
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
  
      } catch (error) {
        console.log(error.message);
      }
    }
  const [tab, setTab] = useState(' ');
  useEffect ( () => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } 
  }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>

            {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dashb'>
              <Sidebar.Item
                active={tab === 'dashb' || !tab}
                icon={MdDashboard}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

<Link to={"/dashboard?tab=profile"}>
    <Sidebar.Item 
        active={tab === 'profile'}
        icon={HiUser} 
        label={currentUser.isAdmin ? 'Admin' : currentUser.isWorker ? 'Worker' : currentUser._id ? 'User' : ''}
        labelColor='dark'
        as='div'
    >
        Profile
    </Sidebar.Item>
</Link>


                {currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
               {currentUser.isAdmin && (
                
                <Link to= "/dashboard?tab=posts">
                <Sidebar.Item
                active ={tab === 'posts'}
                icon = {FaBookReader }
                as='div'
                >
                 User Posts
                </Sidebar.Item>
                </Link>
               )}
               {currentUser.isAdmin && (
                
                <Link to= "/dashboard?tab=dashAppAll">
                <Sidebar.Item
                active ={tab === 'dashAppAll'}
                icon = {FaFileContract }
                as='div'
                >
                 User Applications
                </Sidebar.Item>
                </Link>
               )}
              
              {currentUser.isWorker && (
                <Link to= "/dashboard?tab=newposts">
                <Sidebar.Item
                active ={tab === 'newposts'}
                icon = {HiDocumentText }
                as='div'
                >
                 Posts
                </Sidebar.Item>
                </Link>
              )}
              
              {!currentUser.isWorker && !currentUser.isAdmin &&  (
                <Link to= "/dashboard?tab=dashApp">
                <Sidebar.Item
                active ={tab === 'dashApp'}
                icon = {FaWpforms }
                as='div'
                >
                 Applications
                </Sidebar.Item>
                </Link>
              )}
              
                {currentUser.isAdmin && ( 
                  
                <Link to= "/dashboard?tab=comments">
                <Sidebar.Item
                active ={tab === 'comments'}
                icon = {FaRegCommentAlt  }
                as='div'
                >
                 All User Comments
                </Sidebar.Item>
                </Link>
                )}
              
                {currentUser.isAdmin && ( 
                  
                <Link to= "/dashboard?tab=trycomments">
                <Sidebar.Item
                active ={tab === 'trycomments'}
                icon = {GrUserWorker  }
                as='div'
                >
                 Worker Status
                </Sidebar.Item>
                </Link>
                )}

                <Sidebar.Item icon={HiArrowSmRight} className ='cursor-pointer' onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
