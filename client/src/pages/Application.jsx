import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Application() {
  SwiperCore.use([Navigation]);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/application/get/${params.applicationId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setApplication(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchApplication();
  }, [params.applicationId]);

  return (
    <main className="p-3 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">
        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-lg text-white">Skills</span> Scout
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 pt-7">
        <div className="flex flex-col gap-4 flex-1">
          <p className="text-2xl font-semibold">
            Full Name: <span className="font-normal">{application && `${application.fname} ${application.mname} ${application.lname}`}</span>
          </p>
          <p className="text-2xl font-semibold">
            Permanent Address: <span className="font-normal">{application && application.paddress}</span>
          </p>
          <p className="text-2xl font-semibold">
            Temporary Address: <span className="font-normal">{application && application.taddress}</span>
          </p>
          <p className="text-2xl font-semibold">
            Contact Number: <span className="font-normal">{application && `${application.phoneNumber1}, ${application.phoneNumber2}`}</span>
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-4">
        <div className="flex gap-4">
            <p>User Image: </p>
          <div className="">
            
          <img src={application && application.userImage} alt='listing image' className='w-50 h-25 object-contain rounded-lg' />
            
          </div>

        </div>
            <p>User Documents: </p>
          <div className="">
            <img src={application && application.imageUrls} className='h-20 w-30' />
          </div>
          User CV
          {application && application.cvUrls ? (
            <iframe
              src={application.cvUrls}
              title="CV PDF"
              className="w-full h-96 border rounded-lg"
              frameBorder="0"
            />
          ) : (
            <div className="text-center font-semibold bg-purple-300 p-2 border rounded-lg text-gray-800">
              CV not available
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
