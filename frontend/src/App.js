
import './App.css';
import SpeechToText from './Components/SpeechToText'
import Navigation from './Components/Navigation';
import ObjectDetection from './Components/ObjectDetection';
import { Route, Routes } from "react-router-dom";
import Main from './Components/Main';
import Header from './Components/Header';
import Sosmess from './Components/SOS_Fol/SOS';
import Chartbot from './Components/Chartbot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  return (
    <div className="app-container">

      <nav className="navbar">
      <div className="navbar-title" style={{ fontWeight: 'bold' }}>
      <span className="eye-icon" role="img" aria-label="Eye Icon">&#x1F441;</span>
        Blind Assistant</div>
      </nav>

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
