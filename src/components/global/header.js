import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import axios from "axios";
import { siteLogo } from "../../global";
import humburger from './humburger.svg';

const Header = ({ headerData }) => {
  const [fix, setFix] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const updateFormData = async (formData) => {
    try {
      const formDataResponse = await axios.post("http://localhost:7009/content/formData", formData);
      return formDataResponse.data;
    } catch (error) {
      console.error("Error updating form data:", error);
      throw error;
    }
  };

  useEffect(() => {
    function setFixed() {
      if (window.scrollY >= 100) {
        setFix(true);
      } else {
        setFix(false);
      }
    }

    window.addEventListener("scroll", setFixed);

    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  const isNavItemActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className={`header ${fix ? "navbar_fixed" : ""}`}>
      <div className="container">
        <div className="row">
          <Navbar bg="none" expand="lg">
            <a className="navbar-brand" href="/">
              <img src={siteLogo.logo} alt={siteLogo.alt} />
            </a>
            <Navbar.Toggle aria-controls="navbarSupportedContent">
            <img
          className='svg-icons'
          src={humburger}
          alt='Read'
        />
            </Navbar.Toggle>

            <Navbar.Collapse id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className={`nav-item ${isNavItemActive("/community")}`}>
                  <div
                    className={`benefits nav-link ${isNavItemActive("/community")}`}
                    onClick={() => {
                      navigate("/community");
                    }}
                  >
                    {headerData?.menu1}
                  </div>
                </li>
                <li className={`nav-item ${isNavItemActive("/appointment")}`}>
                  <div
                    className={`benefits nav-link ${isNavItemActive("/appointment")}`}
                    onClick={() => {
                      navigate("/appointment");
                    }}
                  >
                   {headerData?.menu2}
                  </div>
                </li>
                <li className="nav-item" style={{cursor:'pointer'}}>
                  <div onClick={() => { navigate("/"); }}>
                    <img src={siteLogo.logo} alt={siteLogo.alt} />
                  </div>
                </li>
                <li className={`nav-item ${isNavItemActive("/getbook")}`}>
                  <div
                    className={`benefits nav-link ${isNavItemActive("/getbook")}`}
                    onClick={() => {
                      navigate("/getbook");
                    }}
                  >
                    {headerData?.menu3}
                  </div>
                </li>
                {localStorage.getItem("name") ?
                  <li className={`nav-item ${isNavItemActive("/dashboard")}`}>
                    <div className={`benefits nav-link ${isNavItemActive("/dashboard")}`} onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </div>
                  </li> :
                  <li className={`nav-item ${isNavItemActive("/login")}`}>
                    <div className={`benefits nav-link ${isNavItemActive("/login")}`} onClick={() => navigate("/login")}>
                    {headerData?.menu4}                      {/* <SlUserFollowing color="#014838" className="userLogin" /> */}
                    </div>
                  </li>}
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </header>
  );
};

export default Header;

