import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function CommentSection({listingId}) {
    const {currentUser} = useSelector(state => state.user)


  return (
    <div>
        {currentUser ?
        (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Signed in as:</p>
                <img src={currentUser.profilePicture} alt="" 
                className='h-5 w-5 object-cover rounded-full' />
                <Link to ={'/dashboard?tab=profile'}>
                    @{currentUser.username}
                </Link>
            </div>
        ):(
            <div className="">
                You should be logged in to comment.
                <Link to={'/signin'}>
                 Sign-in
                </Link>
            </div>
        )
        }
    </div>
  )
}
