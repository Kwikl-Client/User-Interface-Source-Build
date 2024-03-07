// App.jsx
import React, { useState } from 'react';
import './ads.css';

const AdsVideo = () => {
  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (index) => {
    const isActive = activeSections.includes(index);
    setActiveSections((prevSections) =>
      isActive
        ? prevSections.filter((section) => section !== index)
        : [...prevSections, index]
    );
  };

  return (
    <div className='adVideos'>
      <h1>What people said about my books</h1>
      <p style={{fontSize:'10px'}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className='app'>
        <div className='video-container'>
          <video
            id='video'
            controls
            preload='none'
            poster='https://assets.codepen.io/32795/poster.png'
          >
            <source
              id='mp4'
              src='http://media.w3.org/2010/05/sintel/trailer.mp4'
              type='video/mp4'
            />
            <source
              id='webm'
              src='http://media.w3.org/2010/05/sintel/trailer.webm'
              type='video/webm'
            />
            <source
              id='ogv'
              src='http://media.w3.org/2010/05/sintel/trailer.ogv'
              type='video/ogg'
            />
            <track
              kind='subtitles'
              label='English subtitles'
              src='subtitles_en.vtt'
              // srclang='en'
              default
            ></track>
            <track
              kind='subtitles'
              label='Deutsche Untertitel'
              src='subtitles_de.vtt'
              // srclang='de'
            ></track>
            <p>Your user agent does not support the HTML5 Video element.</p>
          </video>
        </div>

        <div className='contents-container'>
          <button
            className={`collapsible ${
              activeSections.includes(1) ? 'active' : ''
            }`}
            onClick={() => toggleSection(1)}
          >
            <h2>Section 1</h2>
          </button>
          <div
            className={`content ${
              activeSections.includes(1) ? 'active-content' : ''
            }`}
          >
            <h3>Heading</h3>
            <p style={{fontSize:'10px'}}>This is a formal and decent collapsible content for Section 1.</p>
          </div>

          <button
            className={`collapsible ${
              activeSections.includes(2) ? 'active' : ''
            }`}
            onClick={() => toggleSection(2)}
          >
            <h2>Section 2</h2>
          </button>
          <div
            className={`content ${
              activeSections.includes(2) ? 'active-content' : ''
            }`}
          >
            <h3>Heading</h3>
            <p style={{fontSize:'10px'}}>This is a formal and decent collapsible content for Section 2.</p>
          </div>

          <button
            className={`collapsible ${
              activeSections.includes(3) ? 'active' : ''
            }`}
            onClick={() => toggleSection(3)}
          >
            <h2>Section 3</h2>
          </button>
          <div
            className={`content ${
              activeSections.includes(3) ? 'active-content' : ''
            }`}
          >
            <h3>Heading</h3>
            <p style={{fontSize:'10px'}}>This is a formal and decent collapsible content for Section 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsVideo;
