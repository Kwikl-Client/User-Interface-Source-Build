import React, { useEffect, useState } from "react";
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import axios from 'axios';
import AnnouncementBar from "../cusComponents/announcement/announcement";
import headerData from "../../data/header.json";
import './privacy.css';
import './faq.css';

const Faq = () => {
  const [activeItem, setActiveItem] = useState(0); // Set initial active item to 0
  const [headerData, setHeaderData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://localhost:7000/cms/getHeader'),
        ];
        const [headerResponse] = await Promise.all(requests);
        setHeaderData(headerResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const toggleItem = (index) => {
    setActiveItem((prevActiveItem) => (prevActiveItem === index ? null : index));
  }; 
  const [secondsTimer, setSecondsTimer] = useState(99);


  const menuItems = [
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. No arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. Content for Item 1' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. Non arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. ' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. Non arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. ' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. Non arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. Content for Item 1' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. Non arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. ' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    content: 'Cursus eget nunc scelerisque viverra mauris in. At ultrices mi tempus imperdiet. Commodo viverra maecenas accumsan lacus. Non arcu risus quis varius quam quisque id diam vel. Faucibus a pellentesque sit amet porttitor eget dolor. ' },
    
];

  return (
    <>
      <Header headerData={headerData} />
      <AnnouncementBar secondsTimer={secondsTimer}/>
      <div className="faq-container">
        <div style={{borderBottom:'1px solid black'}}>
        <h1>Faq's</h1>
        </div>
        {menuItems.map((item, index) => (
          <div key={index} className="accordion-item">
            <div
              className={`accordion-title ${activeItem === index ? 'active' : ''}`}
              onClick={() => toggleItem(index)}
            >
              {item.title}
            </div>
            <div
              className={`accordion-content ${activeItem === index ? 'active' : ''}`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
      <CusFooter />
    </>
  );
};

export default Faq;
