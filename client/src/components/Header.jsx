import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const path= useLocation().pathname;
  const dispatch= useDispatch()
  const {currentUser} = useSelector(state => state.user);
  const {theme} = useSelector(state => state.theme); 
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
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center 
      whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600
       rounded-lg text-white '>Skills </span>
      Scout
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />

      </form>
      <Button className='w-12 h-10 lg:hidden' 
      color='green' pill>
        <AiOutlineSearch />
      </Button>
      
      <div className='flex gap-2 md:order-2'>

      <Button className='w-12 h-10 hidden sm:inline' 
      color='gray' pill onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    {currentUser ? (
      <Dropdown
      arrowIcon={false}
      inline
      label={
        <Avatar
        alt='user' 
        img={currentUser.profilePicture}
        rounded
        />
      }
      >
        <Dropdown.Header>
          <span className='block text-sm'>@{currentUser.username}</span>
          <span className='block text-sm font-bold truncate'>
            {currentUser.email}</span>
        </Dropdown.Header>
        <Link to={'/dashboard?tab=profile'}>
        <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignout} >Sign Out</Dropdown.Item>
      </Dropdown>
    ): 
    (

      <Link to='/signin'>
      <Button className='bg-gradient-to-r from-lime-600 to-green-600' outline>
        Sign In
      </Button>
            
      </Link>
    )
  }

      <Navbar.Toggle />

      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path ==="/"} as={'div'}>
          <Link to='/'>
          Home
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path ==="/workers"} as={'div'}>
          <Link to='/workers'>
          Workers
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path ==="/about"} as={'div'}>
          <Link to='/about'>
          About
          </Link>
        </Navbar.Link>

      </Navbar.Collapse>

    </Navbar>

  )
}