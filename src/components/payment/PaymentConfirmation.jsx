import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './PaymentConfirmation.css'; // Make sure to create a CSS file for styling

const PaymentConfirmation = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timer); 
    }, []);

    const handleOk = () => {
        navigate('/'); 
    };

    return (
        <div className="confirmation-container">
            {loading ? (
                <div className="loading">
                    <div className="spinner"></div> {/* Loading spinner */}
                </div>
            ) : (
                <>
                    <h2>Payment Confirmation Successful</h2>
                    <button onClick={handleOk} className="ok-button">OK</button>
                </>
            )}
        </div>
    );
};

export default PaymentConfirmation;
