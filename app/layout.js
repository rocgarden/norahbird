import './globals.css'
import { Inter,Architects_Daughter } from 'next/font/google'
import Navbar from './components/navbar';
import Provider from './components/provider';
import Footer from './components/footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Norah Bird',
  description: 'Next App on food and fun in and round Santa Monica',
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
          <Footer />
        </Provider>
        <Analytics/>
      </body>
    </html>
  );
}
