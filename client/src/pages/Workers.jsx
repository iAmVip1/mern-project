import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Workers() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        plumber: false,
        medical: false,
        mechanics: false,
        electrician: false,
        driver: false,
        civilEngineer: false,
        catering: false,
        uncategorized: false,
        sort: 'created_at',
        order: 'desc',
    })

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
    
    
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const plumberFromUrl = urlParams.get('plumber');
        const medicalFromUrl = urlParams.get('medical');
        const mechanicsFromUrl = urlParams.get('mechanics');
        const electricianFromUrl = urlParams.get('electrician');
        const driverFromUrl = urlParams.get('driver');
        const civilEngineerFromUrl = urlParams.get('civilEngineer');
        const cateringFromUrl = urlParams.get('catering');
        const uncategorizedFromUrl = urlParams.get('uncategorized');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        
        if (
            searchTermFromUrl ||
            typeFromUrl ||
            plumberFromUrl ||
            medicalFromUrl ||
            mechanicsFromUrl ||
            electricianFromUrl ||
            driverFromUrl ||
            civilEngineerFromUrl ||
            cateringFromUrl ||
            uncategorizedFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                plumber: plumberFromUrl === 'true' ? true : false,
                medical: medicalFromUrl === 'true' ? true : false,
                mechanics: mechanicsFromUrl === 'true' ? true : false,
                electrician: electricianFromUrl === 'true' ? true : false,
                driver: driverFromUrl === 'true' ? true : false,
                civilEngineer: civilEngineerFromUrl === 'true' ? true : false,
                catering: cateringFromUrl === 'true' ? true : false,
                uncategorized: uncategorizedFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
              });
        }
        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            }else{
                setShowMore(false)
            }
            setListings(data);
            setLoading(false);
          };

          fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'hour' ||
            e.target.id === 'day'
          ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
          }
          
          if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
          }

          if (
            e.target.id === 'plumber' ||
            e.target.id === 'medical' ||
            e.target.id === 'mechanics'   ||
            e.target.id === 'electrician' ||
            e.target.id === 'driver' ||
            e.target.id === 'civilEngineer'   ||
            e.target.id === 'catering'   ||
            e.target.id === 'uncategorized'
          ) {
            setSidebardata({ ...sidebardata,  [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false, });
          }
          if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
      
            const order = e.target.value.split('_')[1] || 'desc';
      
            setSidebardata({ ...sidebardata, sort, order });
          }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('plumber', sidebardata.plumber);
        urlParams.set('medical', sidebardata.medical);
        urlParams.set('mechanics', sidebardata.mechanics);
        urlParams.set('electrician', sidebardata.electrician);
        urlParams.set('driver', sidebardata.driver);
        urlParams.set('civilEngineer', sidebardata.civilEngineer);
        urlParams.set('catering', sidebardata.catering);
        urlParams.set('uncategorized', sidebardata.uncategorized);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

      const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]); 
      }

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen
         dark:border-gray-700">
            <form className='flex flex-col gap-8' onSubmit={handleSubmit} >
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold' >
                        Search:
                    </label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full text-black'
                    value={sidebardata.searchTerm}
                    onChange={handleChange}/>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <label className='font-semibold'>
                        Time: 
                    </label>
                    <div className="flex gap-2 flex-wrap items-center">
                        <input type="checkbox" id='all' 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sidebardata.type === 'all'}
                        />
                        <span >Day & Hour</span>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <input type="checkbox" id='day' 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sidebardata.type === 'day'}
                        />
                        <span >Day </span>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <input type="checkbox" id='hour' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'hour'}
                        />
                        <span >Hour</span>
                    </div>
                </div>

                {/* Categories     */}
                <div className="flex gap-2 flex-wrap">
                    <label className='font-semibold'>
                        Categories: 
                    </label>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='plumber' 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sidebardata.plumber}
                        />
                        <span >Plumber</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='medical' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.medical}
                        />
                        <span >Medical </span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='mechanics' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.mechanics}
                        />
                        <span >Mechanics</span>
                    </div>

                    </div>


                    <div className="flex gap-2 flex-wrap">

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='electrician' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.electrician}
                        />
                        <span >Electrician</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='driver' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.driver}
                        />
                        <span >Driver</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='civilEngineer' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.civilEngineer}
                        />
                        <span >Civil Engineer</span>
                    </div>

                    </div>
                    <div className="flex gap-2 flex-wrap">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='catering' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.catering}
                        />
                        <span >Catering</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <input type="checkbox" id='uncategorized' 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.uncategorized}
                        />
                        <span >Uncategorized</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Sorted By:</label>
                    <select id="sort_order" 
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    className='text-black border rounded-lg p-3'>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>

            </form>
        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-semibold border-b p-3 mt-5 text-center dark:border-gray-700'>
                Available posts
            </h1>
            <div className="p-7 flex flex-wrap gap-4">
                {! loading && listings.length === 0 && (
                    <p className='text-xl ' >No Posts found !!</p>
                )}
                {loading && (
            <p className='text-xl text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
          listings &&
          listings.map((listing) =>
            <ListingItem key={listing._id} listing ={listing} />
        )}

        {showMore && (
            <button onClick={onShowMoreClick}
            className='text-green-700 hover:underline p-7 text-center w-full dark:text-gray-300'
            >
                Show More
            </button>
        )}
            </div>
        </div>
    </div>
  )
}
