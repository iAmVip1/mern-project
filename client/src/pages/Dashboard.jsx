import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from "../components/DashPosts";
import DashNewPosts from "../components/DashNewPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashCommentTry from "../components/DashCommentTry";
import DashboardComp from "../components/DashboardComp";
import DashUserApplication from "../components/DashUserApplication";
import DashAllApplication from "../components/DashAllApplication";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(' ');
  useEffect ( () => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } 
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
        
      </div>
      {/* profile */}
      {tab === 'profile' && <DashProfile />}

      {/* posts */}
      {tab === 'posts' && <DashPosts />}  

      {tab === 'newposts' && <DashNewPosts />}  

    {/* users */}

    {tab === 'users' && <DashUsers />}

    {/* comments */}

    {tab === 'comments' && <DashComments />}

    {tab === 'trycomments' && <DashCommentTry />}

    {/* DashboardComp */}

    {tab === 'dashb' && <DashboardComp />}
    
    {/* DashboardApplication */}

    {tab === 'dashApp' && <DashUserApplication />}

    {tab === 'dashAppAll' && <DashAllApplication />}

    </div>
  )
}
