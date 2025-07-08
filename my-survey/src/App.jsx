import React, { useState, useEffect } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import SurveyForm from './components/SurveyForm';
import './App.css';
import { isDevelopment } from './utils/environment';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId:   import.meta.env.VITE_MSAL_CLIENTID,
    authority:  import.meta.env.VITE_MSAL_AUTHORITY_URL,
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
const loginRequest = { scopes: ['User.Read'] };
const FUNCTION_URL = import.meta.env.VITE_EMAIL_FUNCTION_URL;

export default function App() {
  const [user, setUser] = useState(
    isDevelopment()
      ? {
          username: import.meta.env.VITE_DEV_USER_EMAIL || 'dev@contoso.com',
          name:     import.meta.env.VITE_DEV_USER_NAME  || 'Dev User',
        }
      : null
  );

  useEffect(() => {
    // If we're in development, skip authentication
    if (isDevelopment()) return;
    // If user is already set, no need to init again
    if (user) return;

    const initAuth = async () => {
      try {
        await msalInstance.initialize();
        const resp = await msalInstance.handleRedirectPromise();
        const account = resp?.account || msalInstance.getAllAccounts()[0];

        if (account) {
          setUser({ username: account.username, name: account.name });
        } else {
          await msalInstance.loginRedirect(loginRequest);
        }
      } catch (error) {
        console.error('MSAL Init/Login error:', error);
      }
    };

    initAuth();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading authentication…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <SurveyForm user={user} functionUrl={FUNCTION_URL} />
    </div>
  );
}
