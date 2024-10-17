import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apis/ApiServices';
import { useUser } from '../UserContext'; 
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;

        try {
            const response = await LoginUser(email, password);

            if (response.success) {
                console.log('Login successful:', response.data);
                setUser(response.data); // Set user data in context
                navigate('/'); // Navigate to home or dashboard
            } else {
                setError(response.message || 'Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="form-box">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
