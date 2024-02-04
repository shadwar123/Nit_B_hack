
import './App.css';
import SpeechToText from './Components/SpeechToText'
import Navigation from './Components/Navigation';
import ObjectDetection from './Components/ObjectDetection';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Main from './Components/Main';
import Header from './Components/Header';
import Sosmess from './Components/SOS_Fol/SOS';
import Chartbot from './Components/Chartbot';


const App = () => {
  return (
    <div className="app-container">

      <nav className="navbar">
      <div className="navbar-title" style={{ fontWeight: 'bold' }}>Blind Assistant</div>

      </nav>

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
