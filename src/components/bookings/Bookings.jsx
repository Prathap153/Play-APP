import { useEffect, useState } from "react";
import { BookingDetails } from "../../apis/ApiServices";
import { useUser } from "../UserContext";
import './Bookings.css';
import { useNavigate } from "react-router-dom";

const Bookings = () => {

    const [booking, setBooking] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            bookedDetails(user.id);
        }
    }, [user]);

    const bookedDetails = async (userId) => {
        try {
            const res = await BookingDetails(userId);
            console.log("Booking Details", res);
            setBooking(res);
        } catch (error) {
            console.log("Error fetching bookings:", error);
        }
    };

    const handleCardClick = (sportId) => {
        navigate(`/sports/${sportId}`);
    };

    return (
        <div className="bookings-container">
            <h1>Your Bookings</h1>
            {booking.length > 0 ? (
                booking.map((book) => (
                    <div
                        key={book.id}
                        className="booking-card"
                        onClick={() => handleCardClick(book.sport.id)}
                    >
                        <img src={book.sport.images} alt={book.sport.name} className="sport-image" />
                        <div className="booking-details">
                            <p><strong>Sport:</strong> {book.sport.name}</p>
                            <p><strong>Location:</strong> {book.sport.location}</p>
                            <p><strong>Date:</strong> {book.selectedDate}</p>
                            <p><strong>Time Slot:</strong> {book.selectedTimeSlot}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default Bookings;
