import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import CardAnimation from '../cardsComponent/cardAnimation';
import dashboardPDFjpg from "../dashboardPDFjpg.jpg";
import dashboardPDFpng from "../dashboardPDFpng.png";
import dashboardPDFwebp from "../dashboardPDFwebp.webp";
import dashboardTEXTjpg from "../dashboardTEXTjpg.jpg";
import dashboardTEXTpng from "../dashboardTEXTpng.png";
import dashboardTEXTwebp from "../dashboardTEXTwebp.webp";
import ErrorBoundary from '../../../cusComponents/pdf-view/error'

export default function ReadTab() {
  const navigate = useNavigate();
  const pdfUrl = './components/cusComponents/pdf-view/sample.pdf'; // Provide the correct path

  
  return (
    <div  className="read-access">
       <div onClick={() => navigate('/book')}>
        <CardAnimation
            titleImg = {dashboardTEXTpng}
            characterImg={dashboardTEXTwebp}
            coverImg={dashboardTEXTjpg}
          label={"Text View"} 
          pdfUrl={pdfUrl}
        />
      </div>
      <ErrorBoundary>
      <div onClick={() => navigate('/pdf-book')} className='books-div'>
        <CardAnimation 
        label={"PDF View"}
          titleImg = {dashboardPDFpng}
          characterImg={dashboardPDFwebp}
          coverImg={dashboardPDFjpg}
        />
      </div>
      </ErrorBoundary>

    </div>
  )
}
