import React, { useState } from 'react'
import FlippingCounter from '../FillppingCounter'
import "./home.css"
import { siteLogo } from '../../global'
import SalesCountdownTimer from '../offerbar'
import { IoIosMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { SlUserFollowing } from "react-icons/sl";



const Home = ({ header }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className='navbar_container'>
      <div className='banner-container'>
        <div className='banner-rollerTimer'>
          <FlippingCounter />


          <p style={{ marginBottom: "12px" }}>left</p>
        </div>
        <div className='banner-timerDiv'>
          <SalesCountdownTimer />
        </div>
        {/* <div className='banner-button'> */}
        <button type="button" className="btn banner-button">Buy Now</button>

        {/* </div> */}
      </div>
      <div className='navbar_links__container'>
        {/* <div className='navbar_links_main'> */}
        <div className='navbar_links_community'>

          <p><a>Join Commounity</a></p>
          <p><a>Talk To author</a></p>
        </div>
        <div className='navbar-links-image'>

          <img src={siteLogo.logo} alt={siteLogo.alt} />
        </div>
        <div className='navbar-links-login'>
          <p><a>Get Book Access</a></p>
          <p><a> <SlUserFollowing color="#014838" className="userLogin" />Login</a></p>

        </div>

        {/* </div> p */}

      </div>
      <div className='navbar-menu'>
        {toggle ?
          <div className='closeDiv'>
            <div className='logo-container'>
              <img src={siteLogo.logo} alt={siteLogo.alt} />
            </div>
            <div className='menu-icon'>

              <AiOutlineClose color="#000000" onClick={() => { setToggle(false) }} />
            </div>
          </div>
          :
          <div className='closeDiv'>
            <div className='logo-container'>
            <img src={siteLogo.logo} alt={siteLogo.alt} />
               </div>
               <div className='menu-icon'>
            <IoIosMenu onClick={() => { setToggle(true) }} fontSize={40} />
            </div>
          </div>

        }
        {toggle && (
          <div className='nav-bar-container'>
            <div className='nav-bar-container-links'>
              <p><a>Join Commounity</a></p>
              <p><a>Talk To author</a></p>
              <a className="navbar-brand" href="/"></a>

              <p><a>Get Book Access</a></p>
              <p><a><SlUserFollowing color="#014838" className="userLogin" />Login</a></p>
            </div>
          </div>
        )

        }
      </div>

    </div>

  )
}

export default Home