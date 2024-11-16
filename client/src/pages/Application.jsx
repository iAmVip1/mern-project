import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { Button } from 'flowbite-react';

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
      <div className='m-20px m-auto w-80% font-semibold'>
      <form>
        <table className='w-100%'>
          <tbody>
          <tr>
              <td colSpan="4" 
              className="text-center font-semibold bg-green-300 p-2 rounded-lg text-gray-800">User Details</td>
            </tr>
            <tr>
              <td className="label">Full Name: </td>
              
              <td colSpan="2">
        {application && `${application.fname} ${application.mname} ${application.lname}`}
              </td>
              <td rowSpan="3" className="text-center">
                <p>User's Image</p>
              <img  src={application && application.userImage} alt='listing image' 
              className='w-60 h-22 object-cover rounded-lg' />
            
              </td>
            </tr>
            <tr>
              <td className="label">Permanent Address:</td>
              <td colSpan="2">
              {application && application.paddress}
              </td>
            </tr>
            <tr>
              <td className="label"> Temporary Address: </td>
              <td colSpan="2">
              {application && application.taddress}
              </td>
            </tr>
            <tr>
              <td className="label">Contact Number: </td>
             {application && `${application.phoneNumber1}, ${application.phoneNumber2}`}
            </tr>
            <tr>
              <td className="label">
              </td>
              
              <td>
              <p className="text-2xl font-semibold">
            <span className="font-normal"></span>
          </p>

              </td>
              <td><pre>                                               </pre></td>
              
              <td></td>
            </tr>
            <tr>
              <td colSpan="4" 
              className="text-center font-semibold bg-orange-300 p-2 rounded-lg text-gray-800">User Documents</td>
            </tr>
            <tr>
              <td colSpan="4" className="centered">
                {application && 
                <Swiper navigation>
                {application.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className='h-[450px]'
                      style={{
                        background: `url(${url}) center no-repeat`,
                        
                        backgroundSize: 'contain'
                        ,
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>}
              </td>
            </tr>
            <tr>
              <td colSpan="4" className="text-center font-semibold bg-purple-300 p-2 rounded-lg text-gray-800 ">
                User's Curriculum Vitae</td>
            </tr>
            <tr>
              <td colSpan="4" className="centered">
              {application && application.cvUrls ? (
            <iframe
              src={application.cvUrls}
              title="CV PDF"
              className="w-full h-96 border rounded-lg"
              frameBorder="3"
            />
          ) : (
            <div className="text-center font-semibold bg-purple-300 p-2 border rounded-lg text-gray-800">
              CV not available
            </div>
          )}
              </td>
            </tr>
            <tr>
              <td colSpan="4" className=" ">
                <Button className='w-full' outline> Set Worker </Button>
                </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    </main>
  );
}
