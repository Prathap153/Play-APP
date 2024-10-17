import { useUser } from '../UserContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const { user, setUser } = useUser();
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (city) {
            const lowerCaseCity = city.trim().toLowerCase();
            navigate(`/search/${lowerCaseCity}`);
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar-container">
            <div className="app-name"><h2>PLAY-APP</h2></div>
            <form className="search-form" onSubmit={handleSearch}>
                <input 
                    className="search-input"
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Search by city" 
                />
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="nav-links">
                <Link to="/" className="home">Home</Link>
                {user && (
                    <Link to="/bookings" className="bookings">Bookings</Link>
                )}
            </div>
            <div className="user-links">
                {user ? (
                    <div className="logged-in">
                        <span className='logged-user'>Welcome, {user.name}!</span>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link className="nav-link-login" to='/login'>Login</Link>
                        <Link className="nav-link-signup" to='/signup'>Signup</Link> 
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
