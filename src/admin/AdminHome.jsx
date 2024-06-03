import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome() {
  return (
    <section>
      <div className='div1'>
        <nav className='homenav'>
          <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
          <div>
            <ul className='ul'>
              <li className='li' style={{ marginTop: '13px' }}>Manage Product
                <ul className='ul'>
                  <li className='li'><Link to='/addproduct'>Add Product</Link></li>
                  <li className='li'><Link to='/viewproduct'>All Products</Link></li>
                </ul>
              </li>
              <li className='li'><Link to='/approvecard'>Manage Card Request</Link></li>
              <li className='li'><Link to='/admin'>Logout</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div id='adminimg'>
        <img src='https://unblast.com/wp-content/uploads/2021/08/Financial-Administration-Illustration.jpg' style={{
          width: '500px',
          height: '500px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
      </div>
    </section>
  );
}