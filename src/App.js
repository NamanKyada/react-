import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import Game from './Game';


const App = () => {
  const [userName, setUserName] = useState(null);

  const handleNameSubmit = (name) => {
    localStorage.setItem('userName', name);
    setUserName(name);
  };


  return (
    <div>
      {!userName ? (
        <WelcomePage onNameSubmit={handleNameSubmit} />
      ) : (
        <Game userName={userName}  />
      )}
    </div>
  );
};

export default App;
