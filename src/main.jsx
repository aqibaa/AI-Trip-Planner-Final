import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateTrip from './create-trip/CreateTrip.jsx';
import Header from './components/custom/Header.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import ViewTrip from './view-trip/[tripid]/ViewTrip.jsx';
import Mytrips from './my-trips/Mytrips.jsx';
import { AuthProvider } from './context/AuthContext';
import Favorites from './my-trips/Favorites.jsx';

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      <main>{children}</main>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout>
        <App />
      </RootLayout>
    ),
  },
  {
    path: '/create-trip',
    element: (
      <RootLayout>
        <CreateTrip />
      </RootLayout>
    ),
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <RootLayout>
        <ViewTrip />
      </RootLayout>
    ),
  },
  {
    path: '/my-trips',
    element: (
      <RootLayout>
        <Mytrips />
      </RootLayout>
    ),
  },
  {
    path: '/favorites',
    element: (
      <RootLayout>
        <Favorites  />
      </RootLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);