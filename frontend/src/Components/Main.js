import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import "./Main.css";

function Main() {
  const [videoStream, setVideoStream] = useState(null);
  const [capture ,setcapture] = useState(true);
  const [viewButton, setViewButton] = useState(false);
  const {speak} = useSpeechSynthesis();
  const videoRef = useRef();
  const serverUrl = 'http://127.0.0.1:5000'; 
  // let bool = false;
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
    // const continousCapture = () => {
  //   console.log("event11",bool)
  //   if (bool) {
  //     console.log("event1111",bool)
  //     captureFrame();
  //     setTimeout(continousCapture, 5000); 
  //   }
  //   
  // }

  // useEffect(()=>{
  //   const interval = setInterval(()=>{
  //     if(capture){
  //       captureFrame()
  //     }
  //   },4000);
  //   return () => clearInterval(interval);
  // },[])

  let intervalId = null;

  const continousCapture = () => {
    console.log("event11",capture)
    clearInterval(intervalId); 
    intervalId = setInterval(() => {
      captureFrame();
    }, 2000);
  }


  const handleStart = () => {
    setViewButton(true);
    setcapture(true);
    //   console.log("event11",capture)
    continousCapture();
  }

  const handleStop = () => {
    setViewButton(false);
    setcapture(false);
    clearInterval(intervalId); 
    //   console.log("event11",bool)
    window.location.reload(false);
  }

  const sendFrameToServer = async (frameBlob) => {
    try {
      const response = await fetch(`${serverUrl}/process_image`, {
        method: 'POST',
        body: frameBlob,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });

      if (!response.ok) {
        console.error('Failed to send frame to the server:', response.statusText);
      } else {
        const textData = await fetchTextData();
        if (textData.length > 0) {

          const description = textData.join(', '); 
          console.log("description",description)
            speak({text:description, lang: 'en'})

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
      <div className="navbar">
        <div className="logo">
          Object Detection
        </div>
      </div>
      <div className='box'><video className="image" ref={videoRef} autoPlay /></div>
      <div className="btncontainer">{viewButton ? <button className='button button2' onClick={handleStop}>Stop Frame</button>
        :
        <button className='button' onClick={handleStart}>Capture Frame</button>}
      </div>
    </div>
  );
}

export default Main;