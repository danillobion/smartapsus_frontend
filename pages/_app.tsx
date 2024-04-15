// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Interno from '../components/Layout/Interno/Interno';
import 'tailwindcss/tailwind.css';

// mapa
import 'leaflet/dist/leaflet.css'
// toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Interno>
      <Head>
        <title>SmartAppSUS</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </Interno>
  );
}

export default MyApp;