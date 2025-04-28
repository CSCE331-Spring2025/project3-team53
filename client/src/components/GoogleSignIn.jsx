import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function parseJWT(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error('Error decoding JWT', e);
        return null;
    }
}

export const GoogleSignIn = () => {
  const clientId = '677836819584-1nmmovtsmjl587mbst3l061dl7efnssi.apps.googleusercontent.com';
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    // Handle successful login (e.g., store token, redirect)
    const decoded = parseJWT(response.credential);
    const email = decoded?.email;
    console.log(email);
    if (email) {
        navigate('/CustomerOptions', {state: {email}});
    }
    else {
        console.log('Email not found');
    }

  };

  const onFailure = (error) => {
    console.error('Login Failed: ', error);
    // nothing happens
  };

  return (
    <>
        <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            cookiePolicy="single_host_origin"
        />
        </GoogleOAuthProvider>
    </>
  );
};
