import React from 'react';
export default function InGameNavbar() {
    return (
        <>
            <header>
                <div className='logo'>
                    {"whatever we do for a logo at some point"}
                    <div className="text-white font-bold text-xl">Assassin Game</div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Gamehome" className="text-white hover:text-gray-300 flex items-center">
                                <Home size={18} className="mr-1" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/map" className="text-white hover:text-gray-300 flex items-center">
                                <Search size={18} className="mr-1" /> Map
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="text-white hover:text-gray-300 flex items-center">
                                <User size={18} className="mr-1" /> Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            </>
    )
}