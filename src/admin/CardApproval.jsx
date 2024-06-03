import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminHome from './AdminHome';

export default function CardApproval() {
    const [requests, setRequests] = useState([]);
    const [processedRequests, setProcessedRequests] = useState([]);
    const [cardGenerationRequestId, setCardGenerationRequestId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:1111/getAll')
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the requests!', error);
            });
    }, []);

    const handleApprove = (requestId) => {
        if (!processedRequests.includes(requestId)) {
            setProcessedRequests([...processedRequests, requestId]);
            setCardGenerationRequestId(requestId);

            axios.put(`http://localhost:1111/approve/${requestId}`)
                .then(response => {
                    setRequests(requests.map(request => request.requestId === requestId ? response.data : request));
                })
                .catch(error => {
                    console.error('There was an error approving the request!', error);
                });
        }
    };

    const handleReject = (requestId) => {
        if (!processedRequests.includes(requestId)) {
            setProcessedRequests([...processedRequests, requestId]);
            setCardGenerationRequestId(requestId);

            axios.put(`http://localhost:1111/reject/${requestId}`)
                .then(response => {
                    setRequests(requests.map(request => request.requestId === requestId ? response.data : request));
                })
                .catch(error => {
                    console.error('There was an error rejecting the request!', error);
                });
        }
    };

    const handleView = (requestId) => {
        if (!requests.status === "pending") {
            setCardGenerationRequestId(requestId);
        }
    }

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to='/adminhome'>Home</Link></li>
                            <li className='li' style={{ marginTop: '13px' }}>Manage Product
                                <ul className='ul'>
                                    <li className='li'><Link to='/addproduct'>Add Product</Link></li>
                                    <li className='li'><Link to='/viewproduct'>All Products</Link></li>
                                </ul>
                            </li>
                            <li className='li'><Link to='/admin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <h2 className='text-center mt-3 mb-3'>Card Request List</h2>
            <table className="table table-striped table-info table-hover shadow">
                <thead className='text-center'>
                    <tr className='text-center'>
                        <th className='col'>User ID</th>
                        <th className='col'>User Name</th>
                        <th className='col'>User Occupation</th>
                        <th className='col'>User Salary</th>
                        <th className='col'>Monthly Expenses</th>
                        <th className='col'>Phone Number</th>
                        <th className='col'>Status</th>
                        <th colSpan={4}>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {requests.map((request) => (
                        <tr scope="row" key={request.requestId}>
                            <td>{request.user.userId}</td>
                            <td>{request.user.fullname}</td>
                            <td>{request.user.occupation}</td>
                            <td>{request.user.salary}</td>
                            <td>{request.user.expenses}</td>
                            <td>{request.user.phoneNumber}</td>
                            <td>{request.status}</td>
                            {request.status === "pending" ? (
                                <td>
                                    <button className='btn btn-info' onClick={() => handleApprove(request.requestId)}>Approve</button>
                                </td>
                            ) : (
                                <td>
                                    <button className='btn btn-info' onClick={() => handleApprove(request.requestId)} disabled>Approve</button>
                                </td>
                            )}
                            {request.status === "pending" ? (
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleReject(request.requestId)} >Reject</button>
                                </td>
                            ) : (
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleReject(request.requestId)} disabled>Reject</button>
                                </td>
                            )}
                            <td>
                                {handleView && (
                                    <Link to={`/cardgen/${request.user.userId}`} className='btn btn-primary'>Card Generate</Link>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}