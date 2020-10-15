import React from "react";
import { Link } from 'react-router-dom';

import './style.css';

const TopNav = (props) => {

    const { title } = props;

    return (
        <nav className="top-navbar navbar-expand-lg navbar-light">
            <div className="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                <button type="button" id="sidebarCollapse" className="navbar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h4 style={{ margin: '0px 0px 0px 20px' }}>{title}</h4>
                <div className={"action-area"}>
                    <div className="col-auto active ">
                        <ul className={"dropdown-menu dropdown-menu-right"}>
                            <li className={"dropdown-item d-flex align-items-center"}><Link to="/dashboard/profile">Profile</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
