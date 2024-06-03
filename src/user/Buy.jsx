import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField } from '@mui/material';

export default function CheckoutPage() {
  const productId = useParams();
  const [userId, setUserId] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false); // State to track if the "Pay Now" button should be enabled

  useEffect(() => {
    const getUserIdFromSession = () => {
      const userIdFromSession = sessionStorage.getItem('userId');
      setUserId(userIdFromSession);
    };
    getUserIdFromSession();
  }, []);

console.log(userId);

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

  const handleCardSelect = (card) => {
    setCardDetails(card);
    setIsPayNowEnabled(true);
  }

  const handlePayNow = async (e) => {
    axios.post(`http://localhost:1111//transaction/${userId}/${productId}`)
    Swal.fire({
      title: "Payment Successfull!",
      text: "Your payment successfully your order will be delivered soon...",
      icon: "success"
    });
  }

  return (
    <div>
      <div className='div1'>
        <nav className='homenav'>
          <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
          <div>
            <ul className='ul'>
              <li className='li'><Link to={`/order`}>Your Ouders</Link></li>
              <li className='li'><Link to='/userhome'>Back</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        {cardDetails && (
          <div class="container" id="buycard" onClick={() => handleCardSelect(cardDetails)}>
            <div class="left_section">
              <div class="cards">
                <div class="front_card">
                  <div class="card_container">
                    <img src="https://t3.ftcdn.net/jpg/03/07/83/16/360_F_307831681_MqVLpjXZOH7scHO0DtrduQD7FUXDKH4X.jpg" id='imgbuy' alt="front-card" />
                    <div class="card_info">
                      <span className='span' id="number">Card Number : {cardDetails.cardNumber}</span>
                      <br></br>
                      <span className='span' id="name">Card Holder : {cardDetails.user.fullname}</span>
                      <br></br>
                      <span className='span' id="date">Expiry Date :
                        <span id="month">{cardDetails.month}</span>
                        /
                        <span id="year">{cardDetails.year}</span>
                      </span>
                      <br></br>
                      <span className='span' id="cvc">CVV : {cardDetails.cvv}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
        <Button
          id="buycardbutton"
          variant="contained"
          color="primary"
          disabled={!isPayNowEnabled} // Disable button if pay now is not enabled 
          onClick={handlePayNow}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}