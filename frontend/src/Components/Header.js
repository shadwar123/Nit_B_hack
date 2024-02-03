import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../Components/Header.css'
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

    return (
        //   <div className="button-container">
        //     <Link to="/text-to-speech" className="nav-button">Enable Voice Command</Link>
        //     <Link to="/navigation" className="nav-button" onClick={navigationClick}>Navigation</Link>
        //     <Link to="/object-detection" className="nav-button"  onClick={objectDetectionClick}>Object Detection</Link>
        //     <Link to="/speech-to-text" className="nav-button" onClick={Speechtotext}>Speech To Text</Link>
        //   </div>
        <div className="button-container">
            <div className="button-pair">
                <Link to="/sos-message" className="nav-button" style={{ fontSize: '24px' }} onClick={SosMes}>SOS Messages&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                <Link to="/navigation" className="nav-button" style={{ fontSize: '24px' }} onClick={navigationClick}>Navigation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link>
            </div>
            <div className="button-pair">
                <Link to="/object-detection" className="nav-button" style={{ fontSize: '24px' }} onClick={objectDetectionClick}>Object Detection</Link>
                <Link to="/speech-to-text" className="nav-button" style={{ fontSize: '24px' }} onClick={Speechtotext}>Speech To Text</Link>
            </div>
        </div>

    )
}

export default Header