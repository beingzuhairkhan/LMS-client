'use client';
import  { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from './utils/Theme-provider';
import { Toaster } from 'react-hot-toast';
import { Providers } from './Provider';
import { SessionProvider } from 'next-auth/react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import React from 'react';
import socketIO from 'socket.io-client'
const ENDPOINT  = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""
const socketId = socketIO(ENDPOINT , {transports:["websocket"]})
// import icon from '../public/assets/icon.jpeg'
import {useEffect} from 'react'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

// export const metadta:Metadata = {
//   title: "Garuda Institute",
//   icons: {
//     icon: 
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* <link rel="icon" href="icon" /> */}
  
      </head>
      <body className={`${poppins.variable} ${josefin.variable} !bg-white  bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Custom>{children}</Custom>
              <Toaster position='top-center' reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  useEffect(()=>{
    socketId.on("connection" , ()=> {})

  },[])
  return (
    <>
      {isLoading ? <Loader /> : children}
    </>
  );
}
