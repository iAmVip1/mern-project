import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FaExclamationTriangle } from "react-icons/fa";
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function DashProfile() {
  const {currentUser, error} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] =useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () =>{
    console.log('Uploading image ...');

    setimageFileUploading(true);
    setImageFileUploadError(null);


    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );

        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        imageFileUploading(false);
      },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({...formData, profilePicture: downloadURL});
            setimageFileUploading(false);
        });
    }
  );
  };

  const handleChange = (e) => {
    setFormData ({ ...formData, [e.target.id]: e.target.value})
  };

  // console.log(formData);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setupdateUserError(null);
    setupdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setupdateUserError('No changes made');
      return;
    }
    if(imageFileUploading){
      setupdateUserError('Please wait for image to upload');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : 'PUT',
        headers :{
          'Content-Type' : 'application/json',
        },
        body :JSON.stringify(formData) ,
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setupdateUserError(data.message);

      }
      else{
        dispatch(updateSuccess(data));
        setupdateUserSuccess("User's profile updated successfully ");
      }
      
    } catch (error) {
      dispatch(updateFailure(error.message));
      setupdateUserError(error.message);
    }
  };

  const handleDeleteUser = async() => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok) {
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} 
        ref={filePickerRef}
        hidden />
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md
        overflow-hidden rounded-full "  onClick={() => filePickerRef.current.click()} >
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} 
            text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62, 152, 199, ${
                  imageFileUploadProgress / 100
                })`,
              },
            }}
            
            />
          )}
        <img src={ imageFileUrl || currentUser.profilePicture} alt="user" 
        className= {`rounded-full w-full h-full object-cover border-8 border-[lightblue
          ${
            imageFileUploadProgress &&
            imageFileUploadProgress < 100 &&
            'opacity-60'
          }
        `} />
        </div>
        {imageFileUploadError && (
        <Alert color='failure'>
          {imageFileUploadError}
        </Alert>

        )}
        <TextInput type='text' id='username' placeholder='username' 
        defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='text' id='email' placeholder='email' 
        defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password'  onChange={handleChange}
         />
         <Button className='bg-gradient-to-r from-lime-400 to-lime-500' type='submit'  outline>
          Update
         </Button>

        <Link className='bg-green-500 p-3 rounded-lg uppercase text-center hover:opacity-70 text-white' 
         to={"/create-listing"} >
        Create Post
        </Link>

      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {
        updateUserError && (
          <Alert color='failure' className='mt-5'>
            {updateUserError}
          </Alert>
        )
      }

      {
        error && (
          <Alert color='failure' className='mt-5'>
            {error}
          </Alert>
        )
      }

      <Modal show= {ShowModal} onClose={() => setShowModal(false)}
        popup
        size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
            <FaExclamationTriangle className='h-14 w-14 text-gray-400 
            dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-gray-500 dark:text-gray-400'
            >Do you want to delete your Account ?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm Sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}