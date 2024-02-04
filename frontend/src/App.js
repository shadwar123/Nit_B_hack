
import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Main from './Components/Main';
import Header from './Components/Header';
import Sosmess from './Components/SOS_Fol/SOS';
import Navigation from './Components/Navigation';
import ObjectDetection from './Components/ObjectDetection';
import SpeechToText from './Components/SpeechToText';
import Chartbot from './Components/Chartbot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


const App = () => {

  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");

  const pages = ["main", "sos", "navigation", "objectdetection" ,"speechtotext" ];
 
  const urls = {
    main: "/",
    navigation: "/navigation",
    objectdetection: "/object-detection",
    speechtotext: "/speech-to-text",
    sos:"/sos-message"
  };

  useEffect(() => {
    // Redirect logic based on voice command
    if (redirectUrl) {
      // You can add additional validation or mapping logic if needed
      window.location.href = `/#/${redirectUrl}`;
      
    }
  }, [redirectUrl]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div className="app-container">

      <nav className="navbar">
      <div className="navbar-title" style={{ fontWeight: 'bold' }}>
      <span className="eye-icon" role="img" aria-label="Eye Icon">&#x1F441;</span>
        Blind Assistant</div>
      </nav>
      <div>
      {/* <p id="transcript">Transcript: {transcript}</p> */}
      <button className="nav-button" style={{ width:'100%' }} onClick={SpeechRecognition.startListening}>Start Voice Assistant</button>
      </div>

<div>
  <button className="nav-button" style={{ width: '100vh', fontSize: '30px', textAlign: 'center', paddingTop: '20px' }}>
    <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '8px', color: 'white' }} />
    Start Voice Assistant
  </button>
</div>

      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sos-message" element={<Sosmess/>} />
        <Route path="/navigation" element={<Navigation/>} />
        <Route path="/object-detection" element={<ObjectDetection/>} />
        <Route path="/speech-to-text" element={<SpeechToText/>} />
        <Route path="/chatbot" element={<Chartbot/>} />
      </Routes>


    </div>
  );
};

export default App;
