// react
import React from 'react';
import Head from 'next/head';
// components
import Footer from 'components/Footer';
import Header from 'components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>PROMOZULIA</title>
        <meta name='description' content='Promozulia.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
