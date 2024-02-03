import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function ObjectDetection() {
  const [videoStream, setVideoStream] = useState(null);
  const [capture, setCapture] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const { speak } = useSpeechSynthesis();
  const videoRef = useRef();
  const serverUrl = 'http://127.0.0.1:5000';
  let bool = false;

  const Welcome = 'Welcome to Object Detection'
  useEffect(() => {
    const Welcometext = async () => {
      speak({ text: Welcome, lang: 'en' });
    }
    });

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
    console.log('event11', capture);
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      captureFrame();
    }, 5000);
  };

  const handleStart = () => {
    setViewButton(true);
    setCapture(true);
    continuousCapture();
  };

  const handleStop = () => {
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
      const response = await fetch(`${serverUrl}/process_image`);
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
      <h1>Camera App</h1>
      <video ref={videoRef} autoPlay />
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>

      {viewButton ? (
        <button onClick={handleStop}>Stop Frame</button>
      ) : (
        <button onClick={handleStart}>Capture Frame</button>
      )}
    </div>
  );
}

export default ObjectDetection;
