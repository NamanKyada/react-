import React, { useState } from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onNameSubmit }) => {
  const [userName, setUserName] = useState('');


  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = () => {
    if (userName.trim() !== '') {
      onNameSubmit(userName);

    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <div className='abe'>
      <header className='abc'>React Tiles</header>
      <div className='abf'>
        <label>
          <h3>Enter Your Name </h3>
          <input type="text" value={userName} onChange={handleNameChange} />
        </label>
        <div> 
            <button className="button-65" onClick={handleSubmit}>Start Game</button>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomePage;
