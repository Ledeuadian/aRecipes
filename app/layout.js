import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import Provider from './components/Provider'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-black'>
      <Provider>
      <Navbar />
      {children}
      <Footer />
      </Provider>
      </body>
    </html>
  )
}
