import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar,Dropdown  } from "react-bootstrap";
import { siteLogo } from "../../global";
import { SlUserFollowing } from "react-icons/sl";
import './headrr.css';

const UserHeader = ({ header}) => {
  const [isActive, setActive] = useState(false);
  const [fix, setFix] = useState(false);
  const navigate = useNavigate();

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
  const handleDummyMenuClick = () => {
    // Handle the click on the dummy menu item
    console.log("Dummy Menu Clicked");
  };
  const handleLogout = () => {
    localStorage.removeItem('tkn');
    localStorage.removeItem('name');
    navigate('/');
  };
  const getInlineStyle = () => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    '@media (max-width: 500px)': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'initial',
    },
    '@media (min-width: 501px) and (max-width: 992px)': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
  });

  return (
    <header className={`header ${fix ? "navbar_fixed" : ""}`} style={{borderBottom: '1px solid #e6e3e3', padding:'1%', fontFamily:'Open Sans'}}>
      <div className="user-hdr-container">
        <div className="row">
          <Navbar bg="none" expand="lg" style={{padding:'0px'}}>
            <a className="navbar-brand" href="/" >
              <img src={siteLogo.logo} alt={siteLogo.alt} onClick={() => { navigate("/"); }}/>
            </a>
            <a className="ph-div" onClick={handleLogout}>
                Logout

                </a>
            <Navbar.Collapse id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <div onClick={() => { navigate("/"); }} style={{width:'122px'}}>
                    <img src={siteLogo.logo} alt={siteLogo.alt} className="dashbord-lg"/>
                  </div>
                </li>
                {localStorage.getItem("name")?
               <Dropdown>
               <Dropdown.Toggle className="navbar-link" style={{ fontWeight: '400',backgroundColor:'white',color:'black',border:'none' }} id="userDropdown">
                 {localStorage.getItem("name")} &#x25BC;
               </Dropdown.Toggle>
               <Dropdown.Menu style={{marginTop: '22px',borderRadius: '0px', backgroundColor: '#999'}}>
                 <Dropdown.Item onClick={handleLogout}   className="hover-background" style={{ width: '120px', border: 'none' }} >Logout</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>:
                <li className="nav-item">
                  <div className="benefits nav-link" onClick={() => navigate("/login") }>
                    {"Login"} <SlUserFollowing color="#014838" className="userLogin" />
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

export default UserHeader;
