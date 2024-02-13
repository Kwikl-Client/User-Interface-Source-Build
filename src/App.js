import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import GoogleAnalytics from './components/gAnalytics';
import "./assets/css/margins-paddings.css";
import Version02 from "./components/pages/landingpage";
import AOS from "aos";
import "./assets/css/aos.css";
import Home from './components/pages/home';
import footerData from "./data/footer.json";
import headerData from "./data/header.json";
import Book from "./components/pages/cusPages/book/book";
import AppointmentBooking from "./components/pages/cusPages/appointmentBooking/appointmentbooking";
import Community from "./components/pages/cusPages/community/community";
import Success from "./components/pages/Stripe/Sucess";
import LoginPage from "./components/pages/login/login";
import PrivacyPolicy from './components/pages/privacy';
import TermsandConditions from './components/pages/termsandConditions';
import './app.css';
import GetBookAccess from './components/pages/getBookaccess';
import RefundForm from './components/pages/refundForm';
import Useragreement from './components/pages/userAgreement';
import NewUserDashboard from './components/pages/dashboard/newUserDashboard';
import ComC from './components/pages/cc';
import { Fade } from 'react-bootstrap';
import Faq from './components/pages/faq';
import MyPdfViewer from './components/cusComponents/pdf-view/pdf';
import MyRichTextEditor from './components/pages/richTextEditor';
import { PDFViewer } from '@react-pdf/renderer';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { PdfViewer } from '@syncfusion/ej2-react-pdfviewer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
    const { header } = headerData;
  const { footer } = footerData;
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const version = '2.10.377'; // Replace with the correct version
  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`;

  return (
    <div className="section-wrapper">
    
      <div id="preLoader"></div>
      <BrowserRouter>
      <GoogleAnalytics />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Version02 header={header} footer={footer} />} />
          <Route path ="/book" element={<Book/>}/>
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/community" element={<Community/>}/>
          <Route path="/refundForm" element={<RefundForm/>}/>
          <Route  path='/success' element={<Success />}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path ="/cc" element={<ComC/>} />
          <Route path="/dashboard" element={<NewUserDashboard/>}/>
          <Route path="/pdf-book" element={<MyPdfViewer/>}/>
          <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
          <Route path="/t&c" element={<TermsandConditions/>}/>
          <Route path ="/getbook" element={<GetBookAccess/>}/>
          <Route path ="/user-agreement" element={<Useragreement/>} />
          <Route path ="/faq" element={<Faq/>} />

          {/* <Route path="/3d-cards" element={<CardAnimation/>}/> */}
          {/* <Route path ="/adminDashboard" element={<AdminDashboard/>}/> */}
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
