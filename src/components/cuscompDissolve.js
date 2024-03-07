import React, { useState, useEffect } from 'react';

const DissolveEffect = () => {
  const images = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300/ff0000',
    'https://via.placeholder.com/300/00ff00',
    'https://via.placeholder.com/300/0000ff',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const updateImage = () => {
    setOpacity(0);
  };

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setOpacity(1);
    }, 2000); // Increased duration to slow it down
  }, [currentIndex]);

  return (
    <div className="image-container">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: 'auto',
          opacity: opacity,
          transition: 'opacity 2s ease-in-out', // Increased duration
        }}
      />
      <button onClick={updateImage}>Next</button>
    </div>
  );
};

export default DissolveEffect;
