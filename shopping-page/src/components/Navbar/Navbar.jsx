import React, { useState, useRef } from 'react'
import "./Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const menuElem = useRef()
    const cartMenuElem = useRef()
    const [isIconRotated, setIsIconRotated] = useState(false);
    const handleMenuIconClick = () => {
        menuElem.current.classList.toggle("active")
        setIsIconRotated((prevValue) => !prevValue);
    };
    const handleCartIconClick = () => {
        cartMenuElem.current.classList.toggle("active")
    };
    return (
        <nav className='navbar align-items-center mb-4'>
            <div className='toggle pe-3' onClick={handleCartIconClick}>
                <ShoppingCartIcon />
            </div>
            <h1 className='navbar-logo text-center mb-0 mx-auto'>Veema</h1>
            <div className="toggle ps-3" onClick={handleMenuIconClick}>
                <MenuIcon sx={{ transform: isIconRotated ? 'rotate(90deg)' : 'none', transition: "0.3s" }} />
            </div>
            <div className="menu" ref={menuElem}>
                <ul className='menu-list'>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/">صفحه اصلی</Link></li>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/dashboard">پنل کاربری</Link></li>
                    <li className='menu-list-item'><Link className='menu-list-link' to="/aboutus">درباره ما</Link></li>
                </ul>
            </div>
            <div className="cart-menu" ref={cartMenuElem}>
            </div>
        </nav>
    )
}
