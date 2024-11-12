import { Button, Modal } from 'flowbite-react'
import React, { useRef, useState } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function CreateApplication() {
    const [files, setFiles] = useState([]);
    // const [filesCv, setFilesCv] = useState([]);
    const [formData, setFromData] = useState({
        imageUrls: [],
        cvUrls: [],
        fname: '',
        mname: '',
        lname: '',
        paddress: '',
        taddress: '',
        phoneNumber1: '',
        phoneNumber2: '',

    })
    const [imageUploadError, setImageUploadError] = useState(false);
    const [cvUploadError, setCvUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingCv, setUploadingCV] = useState(false);
    console.log(formData);
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 4) {
            setUploading(true);
            setImageUploadError(false);
            const promises= [];

            for (let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFromData({ ...formData, imageUrls: formData.imageUrls.concat(urls) 
                });
                setImageUploadError(false);
                setUploading(false);
            })
            .catch((err) => {
                setImageUploadError ('Image upload failed (2 MB max per image)');
                setUploading(false);
            })
    }else{
        setImageUploadError ('You can only upload 3 images ');
        setUploading(false);
    }
};

    const handleCvSubmit = (e) => {
        if (files.length > 0 && files.length + formData.cvUrls.length < 4) {
            setUploadingCV(true);
            setCvUploadError(false);
            const promises= [];

            for (let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFromData({ ...formData, cvUrls: formData.cvUrls.concat(urls) 
                });
                setCvUploadError(false);
                setUploadingCV(false);
            })
            .catch((err) => {
                setCvUploadError ('Image upload failed (2 MB max for PDF)');
                setUploadingCV(false);
            })
    }else{
        setCvUploadError ('Your file cannot be uploaded ');
        setUploadingCV(false);
    }
};

const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref (storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
                
            },
            (error)=>{
                reject(error);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                    resolve(downloadURL);
                });
            }
        )
    });
}

const handleRemoveImage = (index) => {
    setFromData({
        ...formData, imageUrls: formData.imageUrls.filter((_, i) => i 
        !== index), 
    })
}
    

  return (
    <main className='p-3 max-w-4xl mx-auto min-h-screen'>
        <h1 className=' text-3xl font-semibold text-center my-7 '>
            <span className='px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600
       rounded-lg text-white '>Skills </span>
      Scout's Application Form </h1>
        <form className='flex flex-col sm:flex-row gap-4' >
        <div className="flex flex-col gap-4 flex-1 ">
            <h1 className='text-center font-semibold bg-orange-300 p-2 border rounded-lg text-gray-800' > 
                Your Details</h1>
        <input type="text" placeholder='First Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='fname'

             required />

             <input type="text" placeholder='Middle Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='mname'
                         
             required />

             <input type="text" placeholder='Last Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='lname'
                         
             required />

            <input type="text" placeholder='Permanent Address' className='border-gray-300 p-3 rounded-lg text-black' id='paddress' 
           
            required />

            <input type="text" placeholder='Temporary Address' className='border-gray-300 p-3 rounded-lg text-black' id='taddress' 
           
            required />

            <input type="number" placeholder='Contact Number' 
            className='border-gray-300 p-3 rounded-lg text-black' 
            id='phoneNumber1' 
            
            required />

            <input type="number" placeholder='Contact Number 2' 
            className='border-gray-300 p-3 rounded-lg text-black' 
            id='phoneNumber2' 
           
            required />

        </div>
        <div className="flex flex-col flex-1 gap-4">
        <h1 className='text-center font-semibold bg-purple-300 p-2 border rounded-lg text-gray-800 ' > 
        Your Documents</h1>
        <p className='font-semibold'>PDF:
            <span className='font-normal text-gray-500 ml-2'>Please upload your CV
                </span>    
            </p>
            <div className="flex gap-4">
            <input 
            onChange={(e)=>setFiles(e.target.files)}
             className='p-1 border border-gray-300 rounded w-full' 
                 type='file' id='cvFile' accept='.pdf' />
                 <button type='button'
                 disabled={uploadingCv}
                 onClick={handleCvSubmit}
                 className='p-2 text-green-500 border border-green-700 rounded 
                uppercase hover:shadow-lg disabled:opacity-80' >
                    {uploadingCv ? 'Uploading...' : 'Upload'}
                    </button>
            </div>

            <p className='text-red-700 text-sm'>{ cvUploadError && cvUploadError }</p>

            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-500 ml-2'>Please upload your certificates or license
                </span>    
            </p>
            <div className="flex gap-4">
                <input onChange={(e)=>setFiles(e.target.files)}
                 className='p-1 border border-gray-300 rounded w-full' 
                 type='file' id='images' accept='image/*' multiple />
                <button type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='p-2 text-green-500 border border-green-700 rounded 
                uppercase hover:shadow-lg disabled:opacity-80' >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
            <p className='text-red-700 text-sm'>{ imageUploadError && imageUploadError }</p>
            {
            formData.imageUrls.length > 0 && formData.imageUrls.map ((url, index) => (
                <div 
                key={url}
                className="flex justify-between p-3 border items-center">
                   <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                   <button type='button' onClick={ () => handleRemoveImage(index)} className='p-3 text-red-700
                   rounded-lg uppercase hover:opacity-60'>
                    Delete
                    </button>
                </div>
            ))
        }

            <Button className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' type='submit'  outline>
          Submit
         </Button>


        </div>
        
             </form>
        
        </main>
  )
}
