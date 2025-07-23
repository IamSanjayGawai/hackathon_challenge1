import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
    
    const videoRef = useRef<HTMLVideoElement>(null)
    const isMobile = useMediaQuery({maxWidth: 767})
    useGSAP(()=> {
       const heroSplit =  new SplitText('.title', {type: 'chars,words'})
       const paragrapghSplit =  new SplitText('.subtitle', {type: 'lines'})


       heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'))

       gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.09
       })

       gsap.from(paragrapghSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 1
       })

       gsap.timeline({
        scrollTrigger:{
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
       })
       .to('.right-leaf', {y: 200}, 0)
       .to('.left-leaf', {y: -200}, 0)

       const startValue = isMobile? 'top 50% ' : 'center 50%'
       const endValue = isMobile? '120% top' : 'bottom top'

       	let tl = gsap.timeline({
	    scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
  if (videoRef.current) {
    videoRef.current.onloadedmetadata = () => {
      if (videoRef.current) {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        });
      }
    };
  }

    }, [])



  return (
<>
<section id='hero' >
<h1 className='title'>
RAW PRESSERY
</h1>

<img 
src='/images/hero-left-leaf.png'
alt='left-leaf'
className='leaft-leaf'
/>

<img 
src='/images/hero-right-leaf.png'
alt='right-leaf'
className='right-leaf'
/>

<div className='body'>
    <div className='content'>
        <div className='space-y-5 hidden md:block'>
          <p>Delecious, No Added Colour</p>
          <p className='subtitle'>Sip the Spirit</p>
        </div>
        <div className='view-cocktails'>
            <p className='subtitle'>
        Juices made with familiar, simple ingredients that are easy to recognize, understand and pronounce.
            </p>
  <a href='#pressery'>View All</a>
        </div>

    </div>

</div>
</section>

<div className='video absolute inset-0 '>
<video 
muted
ref={videoRef}
src='/videos/animated.mp4'
/>
</div>



</>
  )
}

export default Hero