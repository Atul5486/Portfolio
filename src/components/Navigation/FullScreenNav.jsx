import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMyContext } from '../Contextjs/NavbarContext'
import { useRef } from 'react'
import {projectImages1,projectImages2} from '../../images.js'

const FullScreenNav = () => {
  const fullscreenRef=useRef(null);
  const [navOpen,setNavOpen] = useMyContext();

     function gsapAnimation() {
        const tl = gsap.timeline()
        tl.to('#fullscreennav', {
            display: 'block',
            delay:1
        })
        tl.to('.navlink', {
            opacity: 1
        })
        tl.to('.link', {
            opacity: 1,
            rotateX: 0,
            stagger: {
                amount: 0.3
            }
        })
        
    }
    function gsapAnimationReverse() {
        const tl = gsap.timeline()
        tl.to('.link', {
            opacity: 0,
            rotateX: 90,
            stagger: {
                amount: 0.1
            }
        })
        tl.to('.navlink', {
            opacity: 0
        })
        tl.to('#fullscreennav', {
            display: 'none',
        })
    }
  useGSAP(() => {
    if(navOpen){
      gsapAnimation();
    }else{
      gsapAnimationReverse()
    }
  },[navOpen]);

  return(
    <div id='fullscreennav' ref={fullscreenRef} className='text-white w-full h-screen bg-black overflow-hidden z-10 fixed top-0 left-0'>
      <div>
        <div className='navlink flex w-full justify-between items-start p-2'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="50" viewBox="0 0 103 44">
              <path fill='white' fillRule="evenodd" d="M35.1441047,8.4486911 L58.6905011,8.4486911 L58.6905011,-1.3094819e-14 L35.1441047,-1.3094819e-14 L35.1441047,8.4486911 Z M20.0019577,0.000230366492 L8.83414254,25.3433089 L18.4876971,25.3433089 L29.5733875,0.000230366492 L20.0019577,0.000230366492 Z M72.5255345,0.000691099476 L72.5255345,8.44846073 L94.3991559,8.44846073 L94.3991559,16.8932356 L72.5275991,16.8932356 L72.5275991,19.5237906 L72.5255345,19.5237906 L72.5255345,43.9274346 L102.80937,43.9274346 L102.80937,35.4798953 L80.9357483,35.4798953 L80.9357483,25.3437696 L94.3996147,25.3428482 L94.3996147,16.8953089 L102.80937,16.8953089 L102.80937,0.000691099476 L72.5255345,0.000691099476 Z M-1.30398043e-14,43.9278953 L8.78642762,43.9278953 L8.78642762,0.0057591623 L-1.30398043e-14,0.0057591623 L-1.30398043e-14,43.9278953 Z M58.6849955,8.4486911 L43.1186904,43.9274346 L52.3166592,43.9274346 L67.9877996,8.4486911 L58.6849955,8.4486911 Z M18.4688864,25.3437696 L26.7045278,43.9278953 L36.2761871,43.9278953 L28.1676325,25.3375497 L18.4688864,25.3437696 Z"></path>
            </svg>
          </div>
          <div onClick={()=>setNavOpen(!setNavOpen)} className=' h-16 w-16 relative cursor-pointer'>
            <div className='h-22 w-[0.1rem] -rotate-45 origin-top absolute bg-[#D3FD50]'></div>
            <div className='h-22 w-[0.1rem]  right-0 rotate-45 origin-top absolute bg-[#D3FD50]'></div>
          </div>
        </div>
        <div className='max-sm:mt-20'>
        <Marquee title={"PROJECTS"} image1={projectImages1[0]} image2={projectImages2[0]}/>
        <Marquee title={"AGENCY"} image1={projectImages1[1]} image2={projectImages2[1]}/>
        <Marquee title={"CONTACT"}image1={projectImages1[2]} image2={projectImages2[2]}/>
        <Marquee title={"BLOGUE"} image1={projectImages1[3]} image2={projectImages2[3]}/>
        </div>
      </div>
    </div>
  )
}
const Marquee=({title,image1,image2})=>{
  return(
     <div className='link origin-top border-t relative mb-10 cursor-pointer'>
            <h1 className='font-[font2] leading-[0.4] pt-8 max-sm:text-[3rem] max-sm:pt-13 text-center text-[8vw] uppercase'>{title}</h1>
            <div className='moveLink  absolute flex top-0 bg-[#D3FD50] items-center'>
              <div className='moveX flex items-center overflow-x-auto py-2 text-black'>
                <h2 className='whitespace-nowrap font-[font2] leading-0 text-center text-[8vw] uppercase'>Pour Tout Voir</h2>
                <img className='h-24 rounded-full w-80 shrink-0 object-cover' src={image1} />
                <h2 className='whitespace-nowrap font-[font2] leading-0 text-center text-[8vw] uppercase'>Pour Tout Voir</h2>
                <img className='h-24 rounded-full w-80 shrink-0 object-cover' src={image2} />
              </div>
              <div className='moveX flex items-center overflow-x-auto py-2 text-black'>
                <h2 className='whitespace-nowrap font-[font2] leading-0 text-center text-[8vw] uppercase'>Pour Tout Voir</h2>
                <img className='h-24 rounded-full w-80 shrink-0 object-cover' src={image1} />
                <h2 className='whitespace-nowrap font-[font2] leading-0 text-center text-[8vw] uppercase'>Pour Tout Voir</h2>
                <img className='h-24 rounded-full w-80 shrink-0 object-cover' src={image2} />
              </div>
            </div>

          </div>
  )
}
export default FullScreenNav