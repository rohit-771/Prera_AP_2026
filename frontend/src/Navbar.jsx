import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav id='nav-div'>
            <div className='nav-logo'>
                <h2 style={{ color: 'white', margin: 0 }}>PRERA</h2>
            </div>

            {/* Hamburger Icon */}
            <div className='menu-icon' onClick={toggleMenu}>
                {isOpen ? <FaTimes color="white" size={24} /> : <FaBars color="white" size={24} />}
            </div>

            {/* Nav Links */}
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <Link to='/' className='links' onClick={() => setIsOpen(false)}>Home</Link>
                <Link to='/about' className='links' onClick={() => setIsOpen(false)}>About</Link>
                <Link to='/events' className='links' onClick={() => setIsOpen(false)}>Events</Link>
                <Link to='/partner' className='links' onClick={() => setIsOpen(false)}>Partners</Link>
                <Link to='/connect' id='connect' onClick={() => setIsOpen(false)}>Lets Connect</Link>
            </div>
        </nav>
    );
}