// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function HomeNavbar() {
//     return (
//         <section>
//             <div className='div1'>
//                 <nav className='homenav'>
//                     <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
//                     <div>
//                         <ul className='ul'>
//                             <li className='li'><Link to='/home'>Home</Link></li>
//                             <li className='li'><Link to='/admin'>Admin</Link></li>
//                             <li className='li'><Link to='/signin'>User</Link></li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>
//             <div className='div2'>
//                 <img src="https://www.shutterstock.com/image-photo/indian-business-man-counting-newly-600nw-1495015529.jpg"></img>
//             </div>
//         </section>
//     )
// }


import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function HomeNavbar() {


    return (
        <section>
            <div className="div1">
                <nav className="homenav">
                    <Link to="/home" className="h4">
                        <h4>Finance Management System</h4>
                    </Link>
                    <div>
                        <ul className="ul">
                            <li className="li">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="li">
                                <Link to="/admin">Admin</Link>
                            </li>
                            <li className="li">
                                <Link to="/signin">User</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="div2">
                <div>
                    <img
                        src="https://www.shutterstock.com/image-photo/indian-business-man-counting-newly-600nw-1495015529.jpg"
                        alt="Finance management system"
                        style={{
                            objectFit: 'cover',
                            borderRadius: '10px',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
