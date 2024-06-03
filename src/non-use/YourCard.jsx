import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CardDetails = () => {
    const [userId, setUserId] = useState(null);
    const [cardDetails, setCardDetails] = useState(null);

    useEffect(() => {
        const getUserIdFromSession = () => {
            const userIdFromSession = sessionStorage.getItem('userId');
            setUserId(userIdFromSession);
        };

        getUserIdFromSession();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchCardDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:1111/getCardByUserId/${userId}`);
                    setCardDetails(response.data);
                } catch (error) {
                    console.error('Error fetching card details:', error);
                }
            };

            fetchCardDetails();
        }
    }, [userId]);

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to={`/usercard`}>Apply Card</Link></li>
                            <li className='li'><Link to='/userhome'>Back</Link></li>
                            <li className='li'><Link to='/signin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                {cardDetails ? (
                    <div>
                        <p>Card Type: {cardDetails.cardType}</p>
                        <p>Limit: {cardDetails.limit}</p>
                        <p>Card Number: {cardDetails.cardNumber}</p>
                        <p>Validity: {cardDetails.validity}</p>
                        <p>CVV: {cardDetails.cvv}</p>
                        {/* Add more card details here */}
                    </div>
                ) : (
                    <p>Loading card details...</p>
                )}
            </div>
        </div>
    );
};

export default CardDetails;