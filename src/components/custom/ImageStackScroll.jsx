import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
    'https://images.pexels.com/photos/8832092/pexels-photo-8832092.jpeg', 
    'https://images.pexels.com/photos/30886880/pexels-photo-30886880.png',
    'https://images.pexels.com/photos/15578424/pexels-photo-15578424.jpeg',

];

export function ImageStackScroll() {
    const componentRef = useRef(null);
    const stickyRef = useRef(null);
    const imageRefs = useRef([]);
    imageRefs.current = [];

    const addToRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    useLayoutEffect(() => {
       
        const ctx = gsap.context(() => {

            gsap.set(imageRefs.current, {
                xPercent: -50,
                yPercent: -50,
                transformOrigin: 'center center',
                scale: 1,
                opacity: 1,
                rotation: (i) => (i + 1) * 1.5, 
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyRef.current, 
                    start: 'top top',
                    end: `+=${images.length * 800}`, 
                    scrub: true, 
                    pin: true,   
                },
            });


            imageRefs.current.slice(0, -1).forEach((image, index) => {
                
                timeline.to(
                    image,
                    {
                        scale: 0.9,
                        opacity: 0,
                        duration: 1,
                        ease: 'power2.inOut',
                    },
                   
                    index * 0.7
                );
            });

        }, componentRef); 

  
        return () => ctx.revert();
    }, []);

    return (
        <div ref={componentRef}>
            <div ref={stickyRef} className="relative h-screen w-full 
             flex  items-center">
                <div className=" absolute top-4/7 left-1/2 sm:top-4/6 sm:left-1/2 xl:top-1/2 xl:left-1/4 
               w-[50vw] h-[50vh] max-w-lg max-h-[70vh] mt-10 ">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="absolute w-full h-full"
                            style={{ zIndex: images.length - index }}
                        >
                            <img
                                src={src}
                                alt={`Scenic view ${index + 1}`}
                                className="w-full h-full object-cover rounded-3xl shadow-2xl"
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-10 p-12 text-center flex xl:flex-col sm:mt-10 justify-center xl:items-end">
                    <h2 className=" text-lg sm:text-4xl xl:text-5xl sm:max-w-3xl xl:max-w-2xl sm:mt-5 text-gray-800">
                        Your trip is more than a destination ✨ it's a living rhythm.
                        <span className='text-[#ffb703]'>Open fields. Ancient cities weathered by time. Tastes you'll remember forever.</span>
                    </h2>
                </div>
            </div>

        </div>
    );
}