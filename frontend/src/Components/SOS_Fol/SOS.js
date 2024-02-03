// App.js

import React, { useState } from 'react';
import axios from 'axios';
import "./SOS.css"

function App() {
  const [contactName1, setContactName1] = useState('Family (90099*****)');
  const [contactName2, setContactName2] = useState('Friends (94248*****)');

  const handleSendSOS = async () => {
    const fromPhoneNumber = '+16592373024';
    const sosMessage = 'Emergency! Need your help.';
  
    try {
      const response = await axios.post('http://localhost:3001/send-sos', {
        toPhoneNumber: '+919009987905', // Correct parameter name
        fromPhoneNumber,
        sosMessage,
      });
  
      console.log('SMS sent with SID:', response.data.messageSid);
    } catch (error) {
      console.error('Failed to send SOS:', error.message);
    }
  };
  
  return (
    <div>
      <h1>SOS App</h1>
      <div>
        <label>
          Contact Name 1 ({contactName1}):
          <input
            type="text"
            // You might want to replace this input with a text that contains the name
            value={contactName1}
            onChange={(e) => setContactName1(e.target.value)}
            readOnly
          />
        </label>
        <br />
        <label>
          Contact Name 2 ({contactName2}):
          <input
            type="text"
            // You might want to replace this input with a text that contains the name
            value={contactName2}
            onChange={(e) => setContactName2(e.target.value)}
            readOnly
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          SOS Message:
          <p>{`Emergency! Need your help.`}</p>
        </label>
      </div>
      <br />
      <button className='btn-sos' onClick={handleSendSOS}>Send SOS</button>
    </div>
  );
}

export default App;
