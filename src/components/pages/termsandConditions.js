import React ,{useState, useEffect}from 'react';
import axios from 'axios';
import AnnouncementBar from '../cusComponents/announcement/announcement';
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import headerData from "../../data/header.json";
import './termsandConditions.css'

export default function TermsandConditions() {
    const [tndcData, setTndcData] = useState({});
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
            axios.get('http://18.209.7.74:7000/cms/getTndC'),  
          ];  
          const [tndcDataResponse] = await Promise.all(requests);
          setTndcData(tndcDataResponse.data.data);
          console.log(tndcDataResponse.data.data);
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
        <h1>Terms & conditions</h1>
        </div>
        <section>
        <div className='policy-update'>
            <p>
            Updated
            </p>
           January 1, 2024
          </div>
          <div>
          <p>{tndcData.paragraph1}
          </p>
          <div className='privacy-snd-cnt'>
          <h2>{tndcData.secondHeading}</h2>
          <p>{tndcData.paragraph2}</p>
          </div>
          <div className='privacy-trd-cnt'>
          <h2>{tndcData.thirdHeading}</h2>
          <p>{tndcData.paragraph3}</p>
          </div>
          <div className='privacy-trd-cnt'>
              <h2>{tndcData.fourthHeading}</h2>
              <p>
                {tndcData.paragraph4}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{tndcData.fivthHeading}</h2>
              <p>
                {tndcData.paragraph5}</p>
            </div>
            <div className='privacy-trd-cnt'>
              <h2>{tndcData.sixthHeading}</h2>
              <p>
                {tndcData.paragraph6}</p>
            </div>
            {/* <ul>
              <li>
                {tndcData.secondList}
              </li>
              <li>
                {tndcData.firstList}
              </li>
              <li>
                {tndcData.thirdList}
              </li>
              <li>
                {tndcData.fourthList}
              </li>
              <li>
                {tndcData.fivthList}
              </li>
              <li>
                {tndcData.sixthList}
              </li>
            </ul> */}
        </div>

        </section>
  
      </div>
      <CusFooter/>
    </>  
    );
  };
  
