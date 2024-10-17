import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchSports } from "../../apis/ApiServices";
import { useUser } from '../UserContext';
import './SportDetail.css';

const SportDetail = () => {
    const { id } = useParams();
    const [sport, setSport] = useState(null);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { user } = useUser();
    const [availabilityMessage, setAvailabilityMessage] = useState('');

    useEffect(() => {
        fetchBySportId(id);
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const fetchBySportId = async (id) => {
        try {
            const res = await FetchSports();
            const foundSport = res.find((s) => s.id === id);
            if (foundSport) {
                setSport(foundSport);
                const today = new Date().toISOString().split('T')[0];
                setSelectedDate(today);
                const todaySlots = foundSport.availability.find(avail => avail.date === today);
                if (todaySlots) {
                    setAvailableTimeSlots(todaySlots.times);
                    setSelectedTimeSlot(todaySlots.times[0]);
                }
            }
        } catch (error) {
            console.log("Error fetching sport details:", error);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        const slotsForSelectedDate = sport.availability.find(avail => avail.date === date);
        setAvailableTimeSlots(slotsForSelectedDate ? slotsForSelectedDate.times : []);
        setSelectedTimeSlot(slotsForSelectedDate ? slotsForSelectedDate.times[0] : '');
        
        // Update availability message
        if (slotsForSelectedDate && slotsForSelectedDate.times.length > 0) {
            setAvailabilityMessage('');
        } else {
            setAvailabilityMessage('We will update time slots soon.');
        }
    };

    const handleBookNow = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/payment', { state: { sport, selectedDate, selectedTimeSlot, userId: user.id } });
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sport.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + sport.images.length) % sport.images.length);
    };

    return (
        <div className="sport-detail-container">
            {sport ? (
                <div className="detail-flex-container">
                    <div className="image-container">
                        <button onClick={prevImage} className="nav-button">p</button>
                        <img src={sport.images[currentImageIndex]} alt={sport.name} />
                        <button onClick={nextImage} className="nav-button">n</button>
                    </div>
                    <div className="details-container">
                        <h2>{sport.name}</h2>
                        <p><strong>Sport Type:</strong> {sport.type}</p>
                        <p><strong>Location:</strong> {sport.location}</p>
                        <p><strong>Price:</strong> ${sport.price}</p>
                        <p><strong>Rating:</strong> {sport.rating} *</p>
                        <p><strong>Description:</strong> {sport.description}</p>

                        <div className="selection-container">
                            <div className="date-selection">
                                <label>Select Date:</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={handleDateChange}
                                />
                            </div>
                            <div className="time-selection">
                                <label>Select Time Slot:</label>
                                <select value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)} disabled={availableTimeSlots.length === 0}>
                                    {availableTimeSlots.length > 0 ? (
                                        availableTimeSlots.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No available slots</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        {availabilityMessage && <p style={{ color: 'red' }}>{availabilityMessage}</p>}

                        <button onClick={handleBack}>BACK</button>
                        <button onClick={handleBookNow} disabled={availableTimeSlots.length === 0}>BOOK NOW</button>
                    </div>
                </div>
            ) : (
                <div>Loading or sport not found...</div>
            )}
        </div>
    );
};

export default SportDetail;
