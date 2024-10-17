import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apis/ApiServices';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, name } = formData;

        if (!email || !password || !name) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await RegisterUser(formData);

            if (response.success) {
                console.log('Signup successful:', response.data);
                navigate('/login');
            } else {
                setError(response.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Signup error:', err);
        }
    };

    return (
        <div>
            <h2 className="signup-title">Register</h2>
            <div className="signup-container">
                {error && <p className="error-message">{error}</p>}
                <div className="form-box">
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
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
                        <button type="submit" className="signup-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
