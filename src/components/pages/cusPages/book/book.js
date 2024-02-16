import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlippingPages } from 'flipping-pages';
import chapters from './assets/chapters.svg';
import close from './assets/close.svg';
import rightArrIcon from './assets/rightArr.svg';
import leftArrIcon from './assets/leftArr.svg';
import axios from 'axios';
import 'flipping-pages/dist/style.css';
import './book.css';

const Book = () => {
    const token = localStorage.getItem('tkn');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const [book, setBook] = useState(null)
    const [selected, setSelected] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chapterName, setChapterName] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const back = () => {
        setSelected((selected) => Math.max(selected - 1, 0));
    };

    const next = () => {
        setSelected((selected) =>
            Math.min(selected + 1, selectedChapter.length - 1)
        );
    };

    function delay(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    const handleChangeChapter = async (newChapName) => {
        setIsLoading(true)
        await delay(100)
        setSelected(0);
        await delay(100)
        setIsLoading(false)
        setChapterName(newChapName);
        setSelectedChapter(book[newChapName]);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100)
                setIsScrolled(true);
            else
                setIsScrolled(false);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleCloseClick = () => {
        if (token) {
            window.location.href = '/dashboard';
        } else {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        setIsLoading(true);
        let apiUrl;
        if (!token)
            apiUrl = "http://18.207.152.156:7000/cms/getFreeBook"
        else
            apiUrl = "http://18.207.152.156:7000/cms/getBook"

        axios.get(apiUrl, config)
            .then((response) => {
                setBook(response.data.data);
                setSelectedChapter(response.data.data[Object.keys(response.data.data)[0]]);
                setChapterName(Object.keys(response.data.data)[0])
            })
            .catch()
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const headerClass = isScrolled ? 'header-fixed' : '';

    return (
        <div>
            {isLoading ? (
                <div className="loading-container">
                    <h1>Loading Please Wait...</h1>
                </div>
            ) : (
                <>
                    <ul
                        className={`sidenav ${isSidebarOpen ? 'open' : ''}`}
                        style={{
                            position: 'fixed',
                            width: isSidebarOpen ? '266px' : '0',
                            transition: '0.5s',
                            paddingLeft: 0,
                        }}
                    >
                        <div
                            onClick={toggleSidebar}
                            style={{
                                fontSize: '30px',
                                position: 'absolute',
                                top: '10px',
                                right: '25px',
                            }}
                        >
                            &times;
                        </div>
                        {book && Object.keys(book).map((chapter, ind) => (
                            <li key={ind} onClick={() => handleChangeChapter(chapter)} style={{ borderBottom: '1px solid gray', padding: '20px 50px', width: '100%' }}>
                                {chapter}
                            </li>
                        ))}
                    </ul>

                    <div
                        id="main"
                        className={`book-container ${isSidebarOpen ? 'push-content' : ''}`}
                    >
                        <div className="pages">
                            <FlippingPages
                                direction="right-to-left"
                                onSwipeEnd={setSelected}
                                selected={selected}
                                animationDuration={1000}
                            >
                                {selectedChapter && selectedChapter.map((page, index) => (
                                    <div key={index} className="page">
                                        <p key={index}>
                                            <h2 style={{ padding: '36px 0px' }}>{chapterName}</h2>
                                            <p style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                                                {page}
                                            </p>
                                        </p>
                                    </div>
                                ))}
                            </FlippingPages>
                        </div>

                        <div className={`headerbtn-container ${headerClass}`}>
                            <button onClick={toggleSidebar} className='chapter-icon'>
                                <img src={chapters} alt="search" />
                            </button>
                            <Link to="/">
                                <button className='closes-icon' onClick={handleCloseClick}>
                                    <img src={close} className='close-img-svg' alt="close" />
                                </button>
                            </Link>
                        </div>

                        <button className="nxt" onClick={next}>
                            <img src={rightArrIcon} alt="right" style={{ width: '44px' }} />
                        </button>
                        <button className="prev" onClick={back}>
                            <img src={leftArrIcon} alt="left" style={{ width: '44px' }} />
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default Book;
