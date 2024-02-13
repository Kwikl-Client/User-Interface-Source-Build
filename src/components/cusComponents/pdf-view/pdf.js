import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import { BlobProvider } from 'react-pdf';
import CusFooter from '../../global/cusFooter';
import { siteLogo } from '../../../global';
import testPdf from '../pdf-view/testPdf.pdf';
import sample from '../pdf-view/sample.pdf';
import { Link } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import './pdf.css';
import close from '../../pages/cusPages/book/assets/close.svg';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const MyPdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll); // Listen for scroll events
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll); // Remove scroll event listener on component unmount
    };
  }, []);



  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleLogout = () => {
    localStorage.removeItem('tkn');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <>
      <header className={isHeaderSticky ? 'sticky-usr-header' : ''}> 
        <img className='logout-div' src={siteLogo.logo} alt={siteLogo.alt} onClick={() => navigate('/dashboard')} />
        <div className='logout-div' onClick={handleLogout} style={{ fontWeight: '600', fontSize: '16px' }}>Logout</div>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className='clse-icn' onClick={() => navigate('/dashboard')}>
          <img src={close} className='close-img-svg' style={{ width: '34px' }} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="pdf-content" style={{ margin: '4% 0%', maxWidth: viewportWidth > 1300 ? '800px' : '100%', width: '100%', textAlign: viewportWidth > 1300 ? 'center' : 'left' }}>
          <Document file={testPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {
              Array(numPages).fill().map((_, i) => (
                <Page key={i} pageNumber={i + 1} width={viewportWidth > 1300 ? 800 : viewportWidth} />
              ))
            }
          </Document>
        </div>
      </div>
      <CusFooter />
    </>
  );
};

export default MyPdfViewer;
