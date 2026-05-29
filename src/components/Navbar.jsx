import React, { useEffect, useState } from 'react'
import a from '../assets/a.png'
import { TfiMenu } from "react-icons/tfi";
import OverlayMenu from './OverlayMenu'

 const Navbar = ({scrollToSection,target}) => {
  const [menuOpen,setMenuOpen]=useState(false);
  const [visible,setVisible]=useState(true);

  useEffect(() => {
    const homeSection = document.querySelector("#home");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true); 
        } 
      },  
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

   return (
     <>
     <nav className={`fixed px-6 py-4 z-50 top-0 left-0 w-full flex items-center justify-between transition-all duration-300 ${visible ? "translate-y-0" : "translate-y-full"} backdrop-blur-xs`}>

      <div className='flex items-center space-x-2'>

      <img onClick={()=>scrollToSection('home')} src={a} className='w-12 h-12 cursor-pointer' />
      
      </div>

      <div>
        <button onClick={()=>setMenuOpen(true)} 
          className='cursor-pointer text-white text-3xl focus:outline-none'
          aria-label='open Menu'
          >
          <TfiMenu />
        </button>
      </div>
      <div className='hidden lg:block'>
        <button
          onClick={() => scrollToSection('contact')}
          className='px-5 py-2 shadow-lg transition-opacity duration-300 hover:opacity-90 rounded-full text-white font-medium bg-linear-to-r from-pink-500 to-blue-500 cursor-pointer'
        >
          Reach Out
        </button>
      </div>
     </nav>
      <OverlayMenu target={target} scrollToSection={scrollToSection} isOpen={menuOpen} onClose={()=>setMenuOpen(false)}/>
     </>
   )
 }
 
 export default Navbar