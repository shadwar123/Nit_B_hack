import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../Components/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faMap, faCamera, faMicrophone, faComments  } from '@fortawesome/free-solid-svg-icons';
// useEffect(() => {
//     window.scrollTo(0, 0);
// }, [location]);



function Header() {

    const { speak } = useSpeechSynthesis();
    const navigationClick = () => {
        speak({ text: 'Navigation', lang: 'en' });
    }
    const objectDetectionClick = () => {
        speak({ text: 'Object Detection', lang: 'en' });
    }
    const Speechtotext = () => {
        speak({ text: 'Speech to Text Convertor', lang: 'en' });
    }
    const SosMes = () => {
        speak({ text: 'Sos message', lang: 'en' });
    }
    const chatbotclic = () => {
        speak({ text: 'Ai Chat Bot', lang: 'en' });
    }

    return (

        <div className="button-container">
            <div className="button-pair">
                <Link to="/chatbot" className="nav-button" style={{ fontSize: '30px', textAlign: 'center',paddingTop:'30px' }} onClick={chatbotclic}>
                <FontAwesomeIcon icon={faComments} style={{ marginRight: '8px', color: 'white' }} />
                    Chat Bot</Link>
                
            </div>
            <div className="button-pair">
        <Link to="/sos-message" className="nav-button" style={{ fontSize: '30px', textAlign: 'center',paddingTop:'30px' }} onClick={SosMes}>
            <FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '8px', color: 'white' }} />
            SOS Messages
        </Link>
        <Link to="/navigation" className="nav-button" style={{ fontSize: '30px', textAlign: 'center',paddingTop:'30px' }} onClick={navigationClick}>
            <FontAwesomeIcon icon={faMap} style={{ marginRight: '8px', color: 'white' }} />
            Navigation
        </Link>
    </div>
    <div className="button-pair">
        <Link to="/object-detection" className="nav-button" style={{ fontSize: '30px', textAlign: 'center',paddingTop:'30px' }} onClick={objectDetectionClick}>
            <FontAwesomeIcon icon={faCamera} style={{ marginRight: '8px', color: 'white' }} />
            Object Detection
        </Link>
        <Link to="/speech-to-text" className="nav-button" style={{ fontSize: '30px', textAlign: 'center',paddingTop:'30px' }} onClick={Speechtotext}>
            <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '8px', color: 'white' }} />
            Speech To Text
        </Link>
    </div>

        </div>

    )
}

export default Header