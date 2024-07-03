// src/App.js
import React, { useState } from 'react';
import FacebookLoginButton from './components/FacebookLoginButton';
import PagesSelect from './components/PagesSelect';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (response) => {
    setUser({
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      accessToken: response.accessToken,
    });
  };

  return (
    <div className="container">
      {!user ? (
        <FacebookLoginButton onLogin={handleLogin} />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img src={user.picture} alt="User Profile" />
          <PagesSelect accessToken={user.accessToken} />
        </div>
      )}
    </div>
  );
};

export default App;
