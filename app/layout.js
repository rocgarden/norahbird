import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar';
import Provider from './components/provider';
import Footer from './components/footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";

const inter = Inter({ subsets: ['latin'] });
export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    default: "Norah Bird - A Blog for good food in Santa Monica",
    template: "%s | Norah Bird - A Blog for good food in Santa Monica",
  },
  description: "Blog on food and fun in Santa Monica and around the Santa Monica area. Best Santa Monica places to eat good food and snacks. Best Bars in Santa Monica to try.",
};


export default function RootLayout({ children }) {
const nonce = headers().get("x-nonce");

  return (
    <html lang="en">
      {/* <Head nonce={ nonce} /> */}
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
          <div className="bg-gray-100">
            <Footer />
          </div>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
