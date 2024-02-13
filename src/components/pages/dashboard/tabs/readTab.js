import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import CardAnimation from '../cardsComponent/cardAnimation';
import dashsecondcover from '../dashsecondcover.jpg';
import dashsecond3d from '../dashsecond3d.webp';
import dashsecondTitle from '../dashsecondTitle.png';
import dashfirstcover from '../dashfirstcover.jpg';
import dashfirstTitle from '../dashfirstTitle.png';
import firstdash3d from '../firstdash3d.webp';
import ErrorBoundary from '../../../cusComponents/pdf-view/error'

export default function ReadTab() {
  const navigate = useNavigate();
  const pdfUrl = './components/cusComponents/pdf-view/sample.pdf'; // Provide the correct path

  
  return (
    <div  className="read-access">
       <div onClick={() => navigate('/book')}>
        <CardAnimation
            titleImg = {dashsecondTitle}
            characterImg={dashsecond3d}
            coverImg={dashsecondcover}
          label={"Text View"} 
          pdfUrl={pdfUrl}
        />
      </div>
      <ErrorBoundary>
      <div onClick={() => navigate('/pdf-book')} className='books-div'>
        <CardAnimation label={"PDF View"}
          titleImg = {dashfirstTitle}
          characterImg={firstdash3d}
          coverImg={dashfirstcover}
        />
      </div>
      </ErrorBoundary>

    </div>
  )
}
