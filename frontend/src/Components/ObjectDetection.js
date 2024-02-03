import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ObjectDetection.css'
function ObjectDetection() {
  const [videoStream, setVideoStream] = useState(null);
  const [capture, setCapture] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const [startcapture , setstartcapture] = useState(true);
  const { speak } = useSpeechSynthesis();
  const videoRef = useRef();
  const serverUrl = 'http://127.0.0.1:5000';
  let bool = false;
  const commands = [
    {
      command: 'start capturing',
      callback: () => {
        handleStart();
        
      },
    },
    {
      command: 'stop capturing',
      callback: () => {
        handleStop();
      },
    },
    
  ];

  useSpeechRecognition({ commands });

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    initCamera();
  }, []);

  const captureFrame = async () => {

    if (videoRef.current && videoStream) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const frameBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));

      sendFrameToServer(frameBlob);
    }
  };

  let intervalId = null;

  const continuousCapture = () => {
    const commands = [
      {
        command: 'stop capturing',
        callback: () => {
          handleStop();
        },
      },
    ];
    console.log('event11', capture);
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      captureFrame();
    }, 5000);
  };

  const handleStart = () => {
    speak({ text: 'Start frame capturing', lang: 'en' });
    setViewButton(true);
    setCapture(true);
    continuousCapture();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = () => {
    speak({ text: 'Stop Frame Capturing', lang: 'en' });
    setViewButton(false);
    setCapture(false);
    clearInterval(intervalId);
    window.location.reload(false);
  };

  const sendFrameToServer = async (frameBlob) => {
    try {
      const response = await fetch(`${serverUrl}/process_image`, {
        method: 'POST',
        body: frameBlob,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
      console.log(response.json());

      if (!response) {
        console.error('Failed to send frame to the server:', response.statusText);
      } else {
        const textData = await fetchTextData();
        if (textData.length > 0) {
          const description = textData.join(', ');
          console.log('description', description);
          speak({ text: description, lang: 'en' });
        }
      }
    } catch (error) {
      console.error('Error sending frame to the server:', error);
    }
  };

  const fetchTextData = async () => {
    try {
      const response = await fetch(`${serverUrl}/get_text`);
      if (response.ok) {
        const textData = await response.json();
        return textData;
      } else {
        console.error('Failed to fetch text data:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching text data:', error);
      return [];
    }
  };

  return (
    <div className="App">
      <h2>Object Detection</h2>
      <video ref={videoRef} autoPlay />
      {/* <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button> */}

      <div className='obj-button'>
      {/* {startcapture ? 
      (<button className='button-container' onClick={SpeechRecognition.startListening}>Start</button>):
      <button  className='button-container' onClick={SpeechRecognition.stopListening}>Stop</button>
      } */}

      {viewButton ? (
        <button className='button-container' onClick={handleStop}>StopFrame</button>
      ) : (
        <button className='button-container' onClick={handleStart}>CaptureFrame</button>
      )}
      </div>
    </div>
  );
}

export default ObjectDetection;
