import React, {useEffect, useState} from "react";
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import axios from 'axios';
import AnnouncementBar from "../cusComponents/announcement/announcement";
import headerData from "../../data/header.json";
import './privacy.css';

const PrivacyPolicy = () => {
  const { header } = headerData;
  const [policyData, setPolicyData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://localhost:7000/cms/getPolicy'),

        ];

        const [policyResponse] = await Promise.all(requests);
        setPolicyData(policyResponse.data.data);
        console.log(policyResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  const [secondsTimer, setSecondsTimer] = useState(99);
  return (
    <>
      <Header header={header} />
      <AnnouncementBar secondsTimer={secondsTimer}/>   
      <div className='privacy'>
        <div>
          <h1>Privacy Policy</h1>
        </div>
        <section>
          <div className='policy-update'>
            <p>
              Updated
            </p>
            January 1, 2024
          </div>
          <div>
            <p>
              {policyData.paragraph1}
            </p>
            <div className='privacy-snd-cnt'>
              <h2>{policyData.secondHeading}</h2>
              <p>{policyData.paragraph2}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{policyData.thirdHeading}</h2>
              <p>
              {policyData.paragraph3}</p>
            </div>
          </div>
        </section>
      </div>
      <CusFooter />
    </>
  );
};

export default PrivacyPolicy;
