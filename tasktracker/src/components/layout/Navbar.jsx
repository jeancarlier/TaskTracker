import React from "react";
import PropTypes from "prop-types";
import logo from '../../images/logo.png';

const Navbar = ({ title}) => {
  return (
    <nav className="navbar">
      <h1>       
        <img className='logo' src={logo} alt=''></img>
        <span className='title'>{title}</span>
      </h1>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Task Tracker"  
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired  
};

export default Navbar;