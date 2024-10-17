import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingData } from '../../apis/ApiServices'; // Import your booking function
import './Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { sport, selectedDate, selectedTimeSlot, userId } = location.state || {};

    const serviceFee = 30;
    const totalAmount = sport ? sport.price + serviceFee : 0;

    const handlePayment = async () => {
        const bookingData = {
            userId: userId,
            sport: {
                id:sport.id,
                name: sport.name,
                type: sport.type,
                location: sport.location,
                images:sport.images[0]
            },
            selectedDate: selectedDate,
            selectedTimeSlot: selectedTimeSlot,
        };

        const response = await BookingData(bookingData);

        if (response.success) {
            navigate('/paymentconfirm'); 
        } else {
            alert(response.message || 'Booking failed. Please try again.');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="payment-container">
            {sport ? (
                <>
                    <h2 className="payment-title">Payment Details</h2>
                    <div className="payment-details">
                        <h4 className="sport-name">Ground: {sport.name}</h4>
                        <p className="detail"><strong>Sport:</strong> {sport.type}</p>
                        <p className="detail"><strong>Location:</strong> {sport.location}, {sport.city}</p>
                        <p className="detail"><strong>Date:</strong> {selectedDate}</p>
                        <p className="detail"><strong>Time Slot:</strong> {selectedTimeSlot}</p>
                        <p className="detail"><strong>Base Price:</strong> ${sport.price}</p>
                        <p className="detail"><strong>Service Fee:</strong> ${serviceFee}</p>
                        <p className="total-amount"><strong>Total Amount:</strong> ${totalAmount}</p>
                        <div className="button-container">
                            <button onClick={handleBack} className="back-button">Back</button>
                            <button onClick={handlePayment} className="pay-button">Pay Now</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="no-details">No details available. Please go back and select a sport.</div>
            )}
        </div>
    );
};

export default Payment;
