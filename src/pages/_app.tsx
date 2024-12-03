import React, { Component } from 'react';
import '../assets/styles/global.css';
import '../assets/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '../../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
