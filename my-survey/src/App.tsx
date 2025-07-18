import React, { useState, useEffect, JSX } from 'react';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import SurveyForm from './components/AzureForm';
import './App.css';
import { isDevelopment } from './utils/environment';
import { Toaster } from 'react-hot-toast';

interface User {
  username: string;
  name: string;
}

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENTID as string,
    authority: import.meta.env.VITE_MSAL_AUTHORITY_URL as string,
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
const loginRequest = { scopes: ['User.Read'] };
const FUNCTION_URL = import.meta.env.VITE_EMAIL_FUNCTION_URL as string;

export default function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(
    isDevelopment()
      ? {
          username: import.meta.env.VITE_DEV_USER_EMAIL || 'dev@contoso.com',
          name: import.meta.env.VITE_DEV_USER_NAME || 'Dev User',
        }
      : null
  );

  useEffect(() => {
    if (isDevelopment()) return;
    if (user) return;

    const initAuth = async (): Promise<void> => {
      try {
        const resp = await msalInstance.handleRedirectPromise();
        const account: AccountInfo | undefined = resp?.account || msalInstance.getAllAccounts()[0];

        if (account) {
          setUser({
            username: account.username,
            name: account.name ?? 'Unknown Name',
          });
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
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <SurveyForm user={user} functionUrl={FUNCTION_URL} />
      </div>
    </>
  );
}
