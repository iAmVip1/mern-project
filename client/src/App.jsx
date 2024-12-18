import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Workers from './pages/Workers';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateListing from './pages/CreateListing';
import PrivateRoute from './components/PrivateRoute'
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import ScrollToTop from './components/ScrollToTop';
import CreateApplication from './pages/CreateApplication';
import Agreement from './pages/Agreement';
import UpdateApplication from './pages/UpdateApplication';
import Application from './pages/Application';
import Success from './pages/Success';
import Failure from './pages/Failure';


export default function App() {
  return (
    <BrowserRouter >
    <ScrollToTop />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/search' element={<Search />} />
        <Route element = {<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/create-listing' element={<CreateListing />}  />
        <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        <Route path='/create-application' element={<CreateApplication />}  />
        <Route 
        path='/update-application/:applicationId'
        element={<UpdateApplication />}  />
        <Route path='/agree' element={<Agreement />}  />
        <Route path='/application/:applicationId' element={<Application />} />

        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Failure />} />
        
        <Route path='/listing/:listingId' element={<Listing />} />
        
      </Routes>
      <Footer />

    </BrowserRouter>
  )
}