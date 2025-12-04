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

            // --- YEH SABSE AHEM HISSA HAI: matchMedia ---
            ScrollTrigger.matchMedia({
            
                // -- DESKTOP ANIMATION --
                // Yeh animation sirf tab chalega jab screen ki width 768px ya usse zyada ho
                "(min-width: 765px)": function() {
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
                            invalidateOnRefresh: true,
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
                },

                // -- MOBILE VIEW --
                // Jab screen ki width 767px ya usse kam ho, to yeh function chalega.
                // Hum ise khali chhor rahe hain, iska matlab hai ke mobile par koi GSAP animation nahin chalegi.
                "(max-width: 650px)": function() {
                    // No GSAP animations on mobile.
                    // The JSX will just render statically.
                }
            });

        }, componentRef); 
  
        return () => ctx.revert();
    }, []);

    // --- AAPKA ORIGINAL JSX BILKUL WAISA HI HAI ---
    return (
        <div ref={componentRef}>
            <div ref={stickyRef} className="relative h-screen w-full flex items-center">
                
                {/* Image Stack */}
                <div className="absolute top-2/5 left-1/5 sm:top-3/6 sm:left-1/4 md:top-5/7 md:left-2/4 xl:top-1/2 xl:left-1/4 sm:w-[50vw] sm:h-[50vh] w-[60vw] h-[40vh] max-w-lg max-h-[70vh] mt-10">
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

                {/* Text Content */}
                <div className="absolute inset-10 p-12 text-center flex xl:flex-col justify-center xl:items-end">
                    <h2 className="text-lg sm:text-4xl xl:text-5xl sm:max-w-3xl xl:max-w-2xl sm:mt-5 text-gray-800">
                        Your trip is more than a destination ✨ it's a living rhythm.
                        <span className='text-[#ffb703]'>Open fields. Ancient cities weathered by time. Tastes you'll remember forever.</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}