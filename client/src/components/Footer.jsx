import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, } from 'react-icons/bs';
import { FaDeviantart } from "react-icons/fa6";


export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
          <Link to="/" className='self-center 
      whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600
       rounded-lg text-white '>Skills </span>
      Scout
      </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-2 sm:gap-6">
            <div>

            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link
              href='/about'
              // target='_blank'
              rel='noopener noreferrer'
              >
                About Us
              </Footer.Link>

              <Footer.Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              >

                What we Do
              </Footer.Link>

            </Footer.LinkGroup>

            </div>
            
            {/* Follow Us */}
            <div>

            <Footer.Title title='Follow us' />
            <Footer.LinkGroup col>
              <Footer.Link
              href='https://github.com/Viserion2000'
              target='_blank'
              rel='noopener noreferrer'
              >
                Github
              </Footer.Link>
              
              <Footer.Link
              href='https://discord.gg/4cdTfGq6'
              target='_blank'
              rel='noopener noreferrer'
              >

                Discord
              </Footer.Link>

            </Footer.LinkGroup>

            </div>

            {/* legal */}
            {/* <div>

            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Footer.Link
              href='#'
              // target='_blank'
              // rel='noopener noreferrer'
              >
                Privacy Policy
              </Footer.Link>
              
              <Footer.Link
              href='#'
              // target='_blank'
              // rel='noopener noreferrer'
              >

                Terms &amp; condition
              </Footer.Link>

            </Footer.LinkGroup>

            </div> */}
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright
            href='#'
            by="Skills Scout"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
          <Footer.Icon href='https://www.facebook.com/'
          target='_blank' 
          icon={BsFacebook}/>
          <Footer.Icon href='https://www.instagram.com/'
          target='_blank'
          icon={BsInstagram}/>
          <Footer.Icon href='https://github.com/iAmVip1' 
          target='_blank'
          icon={BsGithub}/>
          <Footer.Icon href='#' icon={BsTwitter}/>
          <Footer.Icon href='https://www.deviantart.com'
          target='_blank'
          icon={FaDeviantart}/>

          </div>
        </div>
      </div>
      </Footer>
  )
}
