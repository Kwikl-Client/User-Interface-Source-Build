import React, { useEffect } from 'react';
const GoogleAnalytics = () => {
  useEffect(() => {
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-37H670TJ68';
      document.head.appendChild(script);
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-37H670TJ68');
      };
    }
  }, []);
  return null;
};

export default GoogleAnalytics;
