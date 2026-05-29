import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import {FiX} from 'react-icons/fi'
const OverlayMenu = ({isOpen,onClose,scrollToSection,target}) => {
  const menu=["Home","About","Skills","Projects","Experience","Contact"];
  const sectionMap = {
    Home: "home",
    About: "about",
    Skills: "skills",
    Projects: "projects",
    Experience: "experience",
    Contact: "contact",
  };
  const isMobile=typeof window!=="undefined" &&  window.innerWidth<1024;
  const origin=isMobile ? "95% 8%":"50% 8%";

  return (
    <AnimatePresence>
        {
          isOpen && (
              <motion.div className="fixed inset-0 flex items-center justify-center z-50"
              initial={{clipPath:`circle(0% at ${origin})`}}
              animate={{clipPath:`circle(150% at ${origin})`}}
              exit={{clipPath:`circle(0% at ${origin})`}}
              transition={{duration:0.7,ease:[0.4,0,0.2,1]}}
              style={{backgroundColor:"rgba(0,0,0,0.95)"}}
              >
               
               <button 
                aria-label='Close Menu'
               onClick={onClose} className='cursor-pointer absolute top-6 right-6 text-white text-3xl'>
                <FiX/>
               </button>

               <ul className='space-y-6'>
                {menu.map((item,index)=>(
                  <motion.li
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  transition={{delay:0.3+index*0.1}}
                  key={item}>
                    <a
                    onClick={()=>{
                      onClose()
                      scrollToSection(sectionMap[item] || item.toLowerCase())
                    }}
                    className='cursor-pointer text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300'
                    >{item}</a>
                  </motion.li>
                ))}
               </ul>

               </motion.div>
            
          )
        }
    </AnimatePresence>
  )
}

export default OverlayMenu