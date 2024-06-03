import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useParams, Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { Button, TextField, Container } from '@mui/material';

export default function CheckoutPage() {

    const { productId } = useParams(); // Retrieve productId from URL parameters

    const [userId, setUserId] = useState(null);

    const [transaction, setTransaction] = useState({
        product: {
            productId: productId,
        },
        user: {
            userId: sessionStorage.getItem("userId"),
        },
        status: 'Paid',
    })

    const [cardDetails, setCardDetails] = useState({

        cardNumber: '',

        user: { fullname: '' },

        month: '',

        year: '',

        cvv: '',

    });

    const [productAmount, setProductAmount] = useState(0);

    const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);

    useEffect(() => {
        const getUserIdFromSession = () => {
            const userIdFromSession = sessionStorage.getItem('userId');
            setUserId(userIdFromSession);
        };
        getUserIdFromSession();
    }, []);
    console.log(userId)
    useEffect(() => {
        if (userId) {
            const fetchCardDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:1111/getCardByUserId/${userId}`);
                    setCardDetails(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error fetching card details:', error);
                }
            };
            fetchCardDetails();
        }
    }, [userId]);

    useEffect(() => {

        if (productId) {

            const parsedProductId = parseInt(productId, 10); // Parse productId as integer

            console.log(parsedProductId);

            if (!isNaN(parsedProductId)) {

                axios.get(`http://localhost:1111/getProductById/${parsedProductId}`)

                    .then(response => {

                        setProductAmount(response.data.amount);

                        setIsPayNowEnabled(true);

                    })

                    .catch(error => console.error('Error fetching product details:', error));

            }

        }

    }, [productId]);

    const handlePayNow = async (e) => {

        e.preventDefault();

        try {

            const parsedProductId = parseInt(productId, 10); // Parse productId as integer

            if (!isNaN(parsedProductId)) {

                const formData = new FormData();

                formData.append('userId', userId);

                formData.append('productId', parsedProductId);

                formData.append('amount', productAmount);

                const response = await axios.post(`http://localhost:1111/transaction/${userId}/${parsedProductId}`, transaction);
                setTransaction(response.data);
                console.log(response.data)
                Swal.fire({

                    title: "Payment Successful!",

                    text: "Your payment was successful, and your order will be delivered soon...",

                    icon: "success"

                });

            } else {

                throw new Error('Invalid productId');

            }

        } catch (error) {

            console.error('Error adding transaction:', error);

            Swal.fire({

                title: "Payment Failed!",

                text: "There was an issue processing your payment. Please try again.",

                icon: "error"

            });

        }

    };

    return (

        <Container maxWidth="sm">

            <div className='div1'>

                <nav className='homenav'>

                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>

                    <div>

                        <ul className='ul'>
                            <li className='li'><Link to='/userhome'>Back</Link></li>
                        </ul>

                    </div>

                </nav>

            </div>

            <form onSubmit={handlePayNow}>

                <TextField

                    label="Card Number"

                    value={cardDetails.cardNumber || ''}

                    disabled

                    fullWidth

                    sx={{ marginBottom: 2 }}

                />

                <TextField

                    label="Card Holder"

                    value={cardDetails.user ? cardDetails.user.fullname : ''}

                    disabled

                    fullWidth

                    sx={{ marginBottom: 2 }}

                />

                <TextField

                    label="Expiry Date"

                    value={`${cardDetails.month}/${cardDetails.year}`}

                    disabled

                    fullWidth

                    sx={{ marginBottom: 2 }}

                />

                <TextField

                    label="CVV"

                    value={cardDetails.cvv || ''}

                    disabled

                    fullWidth

                    sx={{ marginBottom: 2 }}

                />

                <TextField

                    label="Product ID"

                    value={productId}

                    disabled

                    fullWidth

                    sx={{ marginBottom: 2 }}

                />

                <Button

                    variant="contained"

                    color="primary"

                    disabled={!isPayNowEnabled} // Disable button if pay now is not enabled

                    type="submit"

                >

                    Pay Now

                </Button>

            </form>

        </Container>

    );

}
