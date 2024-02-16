import React, {useEffect, useState} from "react";
import axios from "axios";
import Authorv3 from "../authorv3";
import BookAbout from "../bookAboutCus";
import CusFooter from "../global/cusFooter";
import Characters from "../cusComponents/characterCustom/charactersCus";
import Header from "../global/header";
import Herov2 from "../herov2";
import Testimonial from "../testimonial";
import "./landingPage.css"
import UltimateHero from "../ultimateHero";
import RefundBanner from "./refundBanner";
import Authorv5 from "./authorv5";
import AnnouncementBar from "../cusComponents/announcement/announcement";

const Version02 = ({header, footer}) => {
  const [heroData, setHeroData] = useState({});
  const [charactersData, setCharactersData] = useState({});
  const [overviewData, setOverviewData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [fomoAuthorData, setFomoAuthorData] = useState({});
  const [offerData, setOfferData] = useState({});
  const [ultimateData, setUltimateData] = useState({});
  const [refundData, setRefundData] = useState({});
  const [reviewData, setReviewData] = useState({});
  const [policyData, setPolicyData] = useState({})
  const [userAgreementData, setUserAgreementData] = useState({})
 const [secondsTimer, setSecondsTimer] = useState(99);

  useEffect(() => {
    const secondsInterval = setInterval(() => {
      setSecondsTimer((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 9000);

    return () => clearInterval(secondsInterval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define an array of promises for parallel requests
        const requests = [
          axios.get('http://18.207.152.156:7000/cms/getHero'),
          axios.get('http://18.207.152.156:7000/cms/getCharacters'),
          axios.get('http://18.207.152.156:7000/cms/getOverview'),
          axios.get('http://18.207.152.156:7000/cms/getAuthor'),
          axios.get('http://18.207.152.156:7000/cms/getOffer'),
          axios.get('http://18.207.152.156:7000/cms/getFomoAuthor'),
          axios.get('http://18.207.152.156:7000/cms/getUltimate'),
          axios.get('http://18.207.152.156:7000/cms/getReview'),
          axios.get('http://18.207.152.156:7000/cms/getRefund'),
          axios.get('http://18.207.152.156:7000/cms/getPolicy'),
          axios.get('http://18.207.152.156:7000/cms/getAgreement'),

        ];

        // Make parallel requests using Promise.all
        const [heroResponse, characterResponse, overviewResponse, authorResponse, offerResponse,
          fomoResponse,ultimateResponse,reviewResponse,refundResponse,policyResponse,userAgreementResponse] = await Promise.all(requests);
        // Set the data in state
        setHeroData(heroResponse.data.data);
        setCharactersData(characterResponse.data.data);
        setOverviewData(overviewResponse.data.data);
        setAuthorData(authorResponse.data.data);
        setOfferData(offerResponse.data.data);
        setFomoAuthorData(fomoResponse.data.data);
        setUltimateData(ultimateResponse.data.data);
        setReviewData(reviewResponse.data.data);
        setRefundData(refundResponse.data.data);
        setPolicyData(policyResponse.data.data);
        setUserAgreementData(userAgreementResponse.data.data);
        console.log(ultimateResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount
  return (
    <>     
      <Header header={header} />
      <Herov2 isBg="yes" heroData={heroData} secondsTimer={secondsTimer} />
      <AnnouncementBar heroData={heroData} secondsTimer={secondsTimer} />   
      <Characters charactersDataa={charactersData} />
      <BookAbout isBg="" overviewData={overviewData} heroData={heroData} secondsTimer={secondsTimer} />
      <Authorv3 isBg="" authorData={authorData} heroData={heroData} secondsTimer={secondsTimer} />
      <RefundBanner refundData={refundData} heroData={heroData}  secondsTimer={secondsTimer} />
      <Testimonial isBg="yes" reviewData={reviewData}/>
      <Authorv5 isBg="" fomoAuthorData={fomoAuthorData} heroData={heroData} secondsTimer={secondsTimer} />
      {/* <AdsVideo/> */}
      <UltimateHero isBg="yes" ultimateData={ultimateData} heroData={heroData} secondsTimer={secondsTimer} />
      <CusFooter policyData ={policyData} userAgreementData={userAgreementData}/>
    </>
  );
};
export default Version02;
