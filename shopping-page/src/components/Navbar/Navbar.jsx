import React, { useState } from 'react'
import "./Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isIconRotated, setIsIconRotated] = useState(false);
    const handleIconClick = () => {
        setIsIconRotated((prevValue) => !prevValue);
    };
    return (
        <nav>
            <div className="toggle d-inline-block" onClick={(event) => handleIconClick(event)}>
                <MenuIcon sx={{ transform: isIconRotated ? 'rotate(90deg)' : 'none', transition: "0.3s" }} />
            </div>
            <div className="menu">
                <ul className='menu-list'>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/">صفحه اصلی</Link></li>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/dashboard">پنل کاربری</Link></li>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/aboutus">درباره ما</Link></li>
                </ul>
            </div>
        </nav>
    )
}
