import React, { useRef, useState } from 'react';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function CreateListing() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const {currentUser} = useSelector(state => state.user)
    const [formData, setFromData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: '',
        regularPrice: 0,
        phoneNumber: '',
        plumber: false,
        medical: false,
        mechanics: false,
        electrician: false,
        driver: false,
        civilEngineer: false,
        catering: false,
        uncategorized: false,
    })

    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);
    
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
        setImageUploadError ('You can only upload 6 images ');
        setUploading(false);
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

    const handleChange = (e) => {
        if (e.target.id === 'day' || e.target.id === 'hour' ) {
         setFromData({
            ...formData,
            type: e.target.id 
         })   
        }

        if (e.target.id === 'plumber' || e.target.id === 'medical' 
            || e.target.id === 'mechanics' || e.target.id === 'electrician' 
            || e.target.id === 'driver' || e.target.id === 'civilEngineer' 
            || e.target.id === 'catering' || e.target.id === 'uncategorized' 
        ) {
            setFromData({
               ...formData,
               [e.target.id]: e.target.checked
            })   
           }

           if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFromData({
               ...formData,
               [e.target.id]: e.target.value
            })   
           } 
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (formData.imageUrls.length < 1) return setError('You must upload at least one image')
            if (formData.phoneNumber.length < 10) return setError('Phone numbers must be 10 numbers')
             if (+formData.regularPrice.length < 2) return setError('Please enter more numbers')   
        setLoading(true);
        setError(false);
        const res = await fetch ('/api/listing/create', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
            }),
        });

        const data = await res.json();
        setLoading(false);
        if (data.success === false){
            setError(data.message);
        }
        navigate (`/listing/${data._id}`)
    } catch (error) {
        setError(error.message);
        setLoading(false);

    }
}

  return (
    <main className='p-3 max-w-4xl mx-auto min-h-screen' >
    <h1 className=' text-3xl font-semibold text-center my-7 '>Create a Post </h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4' > 
        <div className="flex flex-col gap-4 flex-1 ">
            <input type="text" placeholder='Service Name'
             className='border-gray-300 p-3 rounded-lg text-black' 
             id='name'
             onChange={handleChange}
             value={formData.name}
             required />
            <textarea type="text" placeholder='Job Description/ Work Experience' className='border-gray-300 p-3 rounded-lg text-black' id='description'
             required
             onChange={handleChange}
             value={formData.description} />
            <input type="text" placeholder='Address' className='border-gray-300 p-3 rounded-lg text-black' id='address' 
            onChange={handleChange}
            value={formData.address}
            required />
            <input type="number" placeholder='Contact Number' 
            className='border-gray-300 p-3 rounded-lg text-black' 
            id='phoneNumber' 
            onChange={handleChange}
            value={formData.phoneNumber}
            required />
            
            <div className="flex gap-6 flex-wrap">
                {/* Daily */}
                <div className="flex gap-2 flex-wrap items-center ">
                    <input type="checkbox" id='day' className='w-5' onChange={handleChange} checked={formData.type === 'day'} />
                    <span>Per Day</span>
                </div>

                {/* Hourly */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='hour' className='w-5' onChange={handleChange} checked={formData.type === 'hour'} />
                    <span>Per Hour</span>
                </div>

                {/* categories -8 */}
                {/* Plumber */}
                <div className="flex gap-2 flex-wrap items-center ">
                    <input type="checkbox" id='plumber' className='w-5' onChange={handleChange} checked={formData.plumber} />
                    <span>Plumber</span>
                </div>

                {/* medical -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='medical' className='w-5' onChange={handleChange} checked={formData.medical } />
                    <span>Medical</span>
                </div>

                {/* mechanics -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='mechanics' className='w-5' onChange={handleChange} checked={formData.mechanics }  />
                    <span>Mechanics</span>
                </div>
                
                {/* electrician -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='electrician' className='w-5' onChange={handleChange} checked={formData.electrician }  />
                    <span>Electrician</span>
                </div>

                {/* driver -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='driver' className='w-5' onChange={handleChange} checked={formData.driver }  />
                    <span>Driver</span>
                </div>

                {/* civilEngineer -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='civilEngineer' className='w-5' onChange={handleChange} checked={formData.civilEngineer}  />
                    <span>Civil Engineer</span>
                </div>

                {/* catering -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='catering' className='w-5' onChange={handleChange} checked={formData.catering }  />
                    <span>Catering/ Food services</span>
                </div>

                {/* uncategorized -8 */}
                <div className="flex gap-2 flex-wrap items-center">
                    <input type="checkbox" id='uncategorized' className='w-5' onChange={handleChange} checked={formData.uncategorized }  />
                    <span>Uncategorized</span>
                </div>
           </div>
           <div className="">
            <div className="flex items-center gap-2 ">
                <input type="number" id='regularPrice' 
                min='50'
                max='100000'
                className='p-3 border border-gray-300 rounded-lg text-black'
                onChange={handleChange}
            value={formData.regularPrice} 
                required />
                <div className="flex flex-col items-center">
                <p>Regular Pirice</p>

                {formData.type === 'hour' && (
                    <span className='text-xs'>(Rs / Hour)</span>                    
                  )}

                </div>
            </div>
           </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-500 ml-2'>Please upload your working picture (max 6)
                </span>    
            </p>
            <div className="flex gap-4">
                <input onChange={(e)=>setFiles(e.target.files)} className='p-1 border border-gray-300 rounded w-full' 
                 type='file' id='images' accept='image/*' multiple />
                <button type='button'
                disabled={uploading}
                onClick={handleImageSubmit} className='p-2 text-green-500 border border-green-700 rounded 
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
        <Button 
        disabled={loading || uploading}
        className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' type='submit'  outline>
          {loading ? 'Creating...' : 'Create post'}
         </Button>
         {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
    </form>
    </main>
  )
}
