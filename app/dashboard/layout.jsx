import React from "react";
import { Header } from "./_components/Header";
import { SocialIcon } from 'react-social-icons'
import Image from 'next/image'
function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:,mx:36">{children}</div>


      <footer className="bg-gray-800 text-white flex flex-col items-center justify-between gap-2 py-4 px-4 md:flex-row md:justify-around md:items-stretch md:py-8 md:px-8">
      <Image src={'/footerlogo.png'}width={120} height={70} alt='logo' className='flex justify-start ml-14 mt-3 mb-2'></Image>
        

        <div className='mt-14'>
        <p>© 2024 PD AI Mock Interview Platfrom Powered by Gemini AI</p>
        {/* <p><a href="#">Privacy Policy</a></p> */}

        </div>
        <div className='flex justify-center gap-5 mr-12 items-center'>
        <SocialIcon url="https://twitter.com"/>
        <SocialIcon url="https://instagram.com"/>
        <SocialIcon url="https://www.linkedin.com/"/>
        <SocialIcon network="github" />
        </div>
        </footer>
    </div>
  );
}

export default DashboardLayout;
