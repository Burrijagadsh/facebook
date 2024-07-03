// src/components/FacebookLoginButton.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLogin }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onLogin(response);
    }
  };

  return (
    <FacebookLogin
      appId="778792304425540"
      autoLoad={false}
      fields="name,email,picture"
      scope="pages_show_list,pages_read_engagement"
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginButton;
