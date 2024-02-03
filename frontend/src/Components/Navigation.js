import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Navigation() {
  // useEffect(() => {
  //   window.open('https://colab.research.google.com/drive/14hrIAnOG2BNiK3hY7NhQUVmQoTqN5hb1#scrollTo=HEl-wMIcGO6d', '_blank');
  // }, []);

  const { transcript, startListening } = useSpeechRecognition();



  const voiceCommand = () => {
    console.log("voice command");
    startListening();
    console.log("voice 2");

  }

  useEffect(() => {
    // Add click event listener to the document
    document.addEventListener('click', voiceCommand);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', voiceCommand);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts



  
  return (
    <div onClick={voiceCommand}>
      <h2>Navigation</h2>
        <div className="map">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.313178143175!2d77.81844411431312!3d23.52123580341029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c048a269d1ab7%3A0xf7b28bf51d19bbcc!2sSamrat%20Ashok%20Technological%20Institute!5e0!3m2!1sen!2sin!4v1673628696671!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0, marginTop: '10px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
        </div>
    </div>
  )
}

export default Navigation