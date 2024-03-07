import React ,{useState, useEffect}from 'react';
import axios from 'axios';
import AnnouncementBar from '../cusComponents/announcement/announcement';
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import headerData from "../../data/header.json";
import './privacy.css';

export default function Useragreement() {
  const [headerData, setHeaderData] = useState({});
    const [userAgreementData, setUserAgreementData] = useState({});
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests = [
            axios.get('http://18.209.7.74:7000/cms/getHeader'),
          ];
          const [headerResponse] = await Promise.all(requests);
          setHeaderData(headerResponse.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests = [
            axios.get('http://18.209.7.74:7000/cms/getAgreement'),  
          ];  
          const [userAgreementResponse] = await Promise.all(requests);
          setUserAgreementData(userAgreementResponse.data.data);
          console.log(userAgreementResponse.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };  
      fetchData();
    }, []); 
    const [secondsTimer, setSecondsTimer] = useState(99);

    return (
    <>
      <Header headerData={headerData} />
      <AnnouncementBar secondsTimer={secondsTimer}/>   
      <div className='termsndcndtns'>
        <div>
        <h1>User Agreement</h1>
        </div>
        <section>
        <div className='policy-update'>
            <p>
            Updated
            </p>
           January 1, 2024
          </div>
          <div>
          <p>{userAgreementData.paragraph1}
          </p>
          <div className='privacy-snd-cnt'>
          <h2>{userAgreementData.secondHeading}</h2>
          <p>{userAgreementData.paragraph2}</p>
          </div>
          <div className='privacy-trd-cnt'>
          <h2>{userAgreementData.thirdHeading}</h2>
          <p>{userAgreementData.paragraph3}</p>
          </div>
          <div className='privacy-trd-cnt'>
              <h2>{userAgreementData.fourthHeading}</h2>
              <p>
                {userAgreementData.paragraph4}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{userAgreementData.fivthHeading}</h2>
              <p>
                {userAgreementData.paragraph5}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{userAgreementData.sixthHeading}</h2>
              <p>
                {userAgreementData.paragraph6}</p>
            </div>
            {/* <ul>
              <li>
                {userAgreementData.secondList}
              </li>
              <li>
                {userAgreementData.firstList}
              </li>
              <li>
                {userAgreementData.thirdList}
              </li>
              <li>
                {userAgreementData.fourthList}
              </li>
              <li>
                {userAgreementData.fivthList}
              </li>
              <li>
                {userAgreementData.sixthList}
              </li>
            </ul> */}
        </div>

        </section>
  
      </div>
      <CusFooter/>
    </>  
    );
  };
  
