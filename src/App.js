import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';

// Lazy load components
const SportsDetails = lazy(() => import('./components/Pages/Sports/SportsDetails'));
const SportDetail = lazy(() => import('./components/Pages/Sports/SportDetail'));
const SearchByCity = lazy(() => import('./components/Pages/Sports/SearchByCity'));
const Payment = lazy(() => import('./components/Pages/payment/Payment'));
const Login = lazy(() => import('./components/Pages/Auth/Login'));
const Signup = lazy(() => import('./components/Pages/Auth/Signup'));
const Bookings = lazy(() => import('./components/Pages/Bookings/Bookings'));
const PaymentConfirmation = lazy(() => import('./components/Pages/payment/PaymentConfirmation'));

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SportsDetails />} />
            <Route path="/sports/:id" element={<SportDetail />} />
            <Route path="/search/:city" element={<SearchByCity />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/paymentconfirm" element={<PaymentConfirmation />} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
