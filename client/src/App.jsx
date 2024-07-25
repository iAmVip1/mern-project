import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'


export default function App() {
  return (
    <BrowserRouter >
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route element = {<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        
        </Route>
        <Route path="/about" element={<About />} />
        
      </Routes>
      <Footer />

    </BrowserRouter>
  )
}