import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./style.css"


const SideBar = (props) => {
    const [activeItem, setActiveItem] = useState('message')
    function handleItemClick(e) {
        setActiveItem(e);
    }
    return (
        <nav id="sidebar">
            <Link className="sidebar-header" to="/">
            </Link>
            <ul className="list-unstyled components">
                <li className={activeItem === 'home' ? 'actived' : ''} onClick={() => handleItemClick('home')}>
                    <Link to="/home" className="nav-link"><i className="fa fa-tachometer pr-2" />Home</Link>
                </li>
                <li className={activeItem === 'message' ? 'actived' : ''} onClick={() => handleItemClick('message')}>
                    <Link to="/messages" className="nav-link"><i className="fa fa-commenting-o pr-2" aria-hidden="true"></i>Messages</Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;