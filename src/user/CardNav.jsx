import React from 'react'
import { Link } from 'react-router-dom'
function CardNav() {
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
        </div>
    )
}

export default CardNav
