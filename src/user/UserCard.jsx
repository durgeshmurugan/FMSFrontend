import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function UserCard() {

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
                            <li className='li'><Link to='/userhome'>Home</Link></li>
                            <li className='li'><Link to={`/usercard`}>Apply Card</Link></li>
                            <li className='li'><Link to='/signin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                {cardDetails ? (
                    <div class="container">
                        <div class="left_section">
                            <div class="cards">
                                <div class="front_card">
                                    <div class="card_container">
                                        <img src="https://t3.ftcdn.net/jpg/03/07/83/16/360_F_307831681_MqVLpjXZOH7scHO0DtrduQD7FUXDKH4X.jpg" alt="front-card" />
                                        <br></br>
                                        <span id="number">Card Number : {cardDetails.cardNumber}</span>
                                        <div class="card_info">
                                            <span id="name">Card Holder : {cardDetails.user.fullname}</span>
                                            <br></br>
                                            <span id="date">Expiry Date :
                                                <span id="month">{cardDetails.month}</span>
                                                /
                                                <span id="year">{cardDetails.year}</span>
                                            </span>
                                            <br></br>
                                            <span id="cvc">CVV : {cardDetails.cvv}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class="card" id='ordercard'>
                        <div class="card-body">
                            <h5 class="card-title">No Card Available Please apply for the card!!!</h5>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}
