import React, { useEffect, useState } from 'react'
import Views from './Views'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Order() {
    const [transaction, setTransaction] = useState([
        // {
        //     product: {
        //         productName: '',
        //         price: ''
        //     },
        //     date: '',
        //     status: ''
        // }
    ]);
    const [cardDetails, setCardDetails] = useState(null);

    const [userId, setUserId] = useState(null);

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
                    const response = await axios.get(`http://localhost:1111/getTransaction/user/${userId}`);
                    setTransaction(response.data);
                } catch (error) {
                    console.error('Error fetching card details:', error);
                }
            };
            fetchCardDetails();
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const getCardDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:1111/getCardByUserId/${userId}`);
                    setCardDetails(response.data);
                } catch (error) {
                    console.error('Error fetching card details:', error);
                }
            };
            getCardDetails();
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
                            <li className='li'><Link to={`/yourcard`}>Manage Card</Link></li>
                            <li className='li'><Link to='/signin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div>
                {cardDetails ? (
                    <div class="card" id='ordercard'>
                        <div class="card-body">
                            <h5 class="card-title">Card Type : {cardDetails.cardType}</h5>
                            <h5 class="card-title">Card Type : {cardDetails.limit}</h5>
                            <h5 class="card-title">Card Balance : {cardDetails.balance}</h5>
                        </div>
                    </div>
                ) : (
                    <div class="card" id='ordercard'>
                        <div class="card-body">
                            <h5 class="card-title">No Card Balance</h5>
                        </div>
                    </div>
                    )}
            </div>
            <h2 className='text-center mt-3 mb-3' id='orderh2'>Your Orders</h2>
            <table className="table table-striped table-info table-hover shadow" id='ordertable'>
                <thead className='text-center'>
                    <tr className='text-center'>
                        <th className='col'>Product Name</th>
                        <th className='col'>Product Price</th>
                        <th className='col'>Order Date</th>
                        <th className='col'>Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {transaction
                        .map((transactions) => (
                            <tr scope="row" key={transactions.transactionId}>
                                <td>{transactions.product.productName}</td>
                                <td>{transactions.product.price}</td>
                                <td>{transactions.date}</td>
                                <td>{transactions.status}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
