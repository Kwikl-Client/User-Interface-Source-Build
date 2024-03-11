import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./cusFooter.css";
import cpLogo from "./cpLogo.png";
import dmca_logo from "./dmca_logo.png";
import kwikl from "./kwikl.png";
import stripe from "./stripe.png"

export default function CusFooter({footerData}) {
  const navigate = useNavigate();
  const [footer,setFooter] = useState({});
  const handleLink = (link) => {
    navigate(link)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://172.31.28.17:7000/cms/getFooter'),
        ];
        const [footerResponse] = await Promise.all(requests);
        setFooter(footerResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='footer-container'>
      <div className='center-ftr'>
      <div className='ftr-cnt-img-1'>
        <div>{footer.image1Content}</div>
        <img src={cpLogo} alt="copyright" style={{width:'43%'}}/>
      </div>
      <div className='ftr-cnt-img-2'>
        <div>{footer.image2Content}</div>
        <img src={dmca_logo} alt="copyright"/>
      </div>
      <div className='ftr-cnt-img-3'>
        <div>{footer.image3Content}</div>
        <img src={stripe} alt="Safe & Secure Payment"/>
      </div>
      <div className='ftr-cnt-img-4'>
        <div>{footer.image4Content}</div>
        <img src={kwikl} style={{width:'38%'}} alt="Powered & Marketed"/>
      </div>
      </div>
      <hr className='full-line' />
      
      <div className='comment-div'>
        <div className='comment-text'style={{color:'white'}}>©{footer.copyrights}</div>
        <div className="tc-text" onClick={() => handleLink('/privacyPolicy')}>{footer.privacyPolicy}</div> |
        <div  onClick={() => handleLink('/t&c')}>{footer.tAndc}</div> |
        <div  onClick={() => handleLink('/user-agreement')}>{footer.userAgreement}</div> |
        <div  onClick={() => handleLink('/faq')}>{footer.faqs}</div> 

      </div>
      
    </div>
  )
}
