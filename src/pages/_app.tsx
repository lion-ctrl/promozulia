/// <reference types="styled-jsx" />
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import 'styles/form.css';
import 'styles/slick/slick.css';
import 'styles/slick/slick.theme.css';

import globalStyles from 'styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position='top-center'
        containerStyle={{ top: '12%', textAlign: 'center' }}
      />
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
}

export default MyApp;
