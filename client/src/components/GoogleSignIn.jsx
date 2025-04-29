import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import * as func from '../apiCall'
import { GlobalContext } from './GlobalContext';

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
  const {setCustomerLoggedIn} = useContext(GlobalContext);

  const onSuccess = async (response) => {
    // Handle successful login (e.g., store token, redirect)
    const decoded = parseJWT(response.credential);
    const email = decoded?.email;
    console.log(email);
    if (email) {
        func.dequeue_order(0); //clears cart

        //check if account already exists; if not, sign up
        const usernames = await func.login_get_username();
        let exist = false;
        for (const value of usernames.values()){
          if(value.id === email){
            exist = true;
            break;
          }
        }
        if(!exist){
          func.login_signup(email, "");
        }

        setCustomerLoggedIn(email);

        //login to account and populate cart
        let data = (await func.login_signin(email, "")).data;
        let savedCart = JSON.parse(data);
        savedCart.forEach(element => {
          func.enqueue_order(element[0], element[1], element[2], element[3], element[4]);
        });
        navigate('/CustomerOptions');
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
