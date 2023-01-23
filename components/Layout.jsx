import React from 'react'
import Head from 'next/head'; // Basically like head in html only
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Hoodie Store</title>
      </Head>
      <header>
        <Navbar>

        </Navbar>
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout