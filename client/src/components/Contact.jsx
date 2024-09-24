import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [worker, setWorker] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setWorker(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorker();
  }, [listing.userRef]);
  return (
    <>
      {worker && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{worker.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg text-black'
          ></textarea>

          <Link
          to={`mailto:${worker.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Mail          
          </Link>
        </div>
      )}
    </>
  );
}