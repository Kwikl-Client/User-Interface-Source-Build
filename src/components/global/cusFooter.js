import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./cusFooter.css";
import cpLogo from "./cpLogo.png";
import dmca_logo from "./dmca_logo.png";
import kwikl from "./kwikl.png";
import stripe from "./stripe.png"

export default function CusFooter() {
  const navigate = useNavigate();
  const handleLink = (link) => {
    navigate(link)
  }

  return (
    <div className='footer-container'>
      <div className='center-ftr'>
      <div className='ftr-cnt-img-1'>
        <div>Copyright Registered</div>
        <img src={cpLogo} alt="copyright" style={{width:'43%'}}/>
      </div>
      <div className='ftr-cnt-img-2'>
        <div>Protected & Monitored</div>
        <img src={dmca_logo} alt="copyright"/>
      </div>
      <div className='ftr-cnt-img-3'>
        <div>Safe & Secure Payment</div>
        <img src={stripe} alt="Safe & Secure Payment"/>
      </div>
      <div className='ftr-cnt-img-4'>
        <div>Powered & Marketed</div>
        <img src={kwikl} style={{width:'38%'}} alt="Powered & Marketed"/>
      </div>
      </div>
      <hr className='full-line' />
      
      <div className='comment-div'>
        <div className='comment-text'style={{color:'white'}}>©2024 All Rights Reserved</div>
        <div className="tc-text" onClick={() => handleLink('/privacyPolicy')}>Privacy Policy</div> |
        <div  onClick={() => handleLink('/t&c')}>Terms & conditions</div> |
        <div  onClick={() => handleLink('/user-agreement')}>User Agreement</div> |
        <div  onClick={() => handleLink('/faq')}>Faq</div> 

      </div>
      
    </div>
  )
}
