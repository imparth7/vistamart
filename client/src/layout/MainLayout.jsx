import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'

const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className='px-7 pt-10 pb-16 min-h-96'>
        <Toaster richColors />
        {children}
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default MainLayout