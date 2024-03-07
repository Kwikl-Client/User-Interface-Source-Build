import React, { useEffect, useState } from "react";
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import axios from 'axios';
import AnnouncementBar from "../cusComponents/announcement/announcement";
import headerData from "../../data/header.json";
import './privacy.css';

const PrivacyPolicy = () => {
  const [policyData, setPolicyData] = useState({});
  const [headerData, setHeaderData] = useState({});
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
          axios.get('http://18.209.7.74:7000/cms/getPolicy'),

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
      <Header headerData={headerData} />
      <AnnouncementBar secondsTimer={secondsTimer} />
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
            <div className='privacy-trd-cnt'>
              <h2>{policyData.fourthHeading}</h2>
              <p>
                {policyData.paragraph4}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{policyData.fivthHeading}</h2>
              <p>
                {policyData.paragraph5}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{policyData.sixthHeading}</h2>
              <p>
                {policyData.paragraph6}</p>
            </div>
            {/* <ul>
              <li>
                {policyData.secondList}
              </li>
              <li>
                {policyData.firstList}
              </li>
              <li>
                {policyData.thirdList}
              </li>
              <li>
                {policyData.fourthList}
              </li>
              <li>
                {policyData.fivthList}
              </li>
              <li>
                {policyData.sixthList}
              </li>
            </ul> */}

          </div>


        </section>
      </div>
      <CusFooter />
    </>
  );
};

export default PrivacyPolicy;
