import { Button } from '../ui/button'
import { Link } from 'react-router'
import { VideoCarousel } from './VideoCarousel'
import { ImageStackScroll } from './ImageStackScroll'
import { FeatureSection } from './FeatureSection'

export default function Hero() {
    return (
        <>
            <div

                className=" relative h-screen w-full flex flex-col items-center gap-9 justify-center overflow-hidden">
                <video
                    src='videos/v12.mp4'
                    autoPlay
                    loop
                    muted
                    className="absolute w-full h-full object-cover z-[-1]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative  z-10 text-white text-center px-6">
                    <h1 className='font-extrabold text-2xl py-10 sm:text-3xl md:text-[60px] drop-shadow-lg text-center'>
                        <span className='text-[#ffb703]'>
                            Discover Your Next Adventure with AI
                        </span> Peronalized Itineraries at Your FingerTips.
                    </h1>
                    <p className='text-lg text-white text-center mt-4 md:text-2xl max-w-3xl mx-auto drop-shadow-md'>Your personal trip planner and travel curator,
                        <span className='text-[#ffb703]'> creating custom itineraries tailored to your interests and budget.
                        </span></p>


                    <div className="mt-8 flex  justify-center gap-4">
                        <Link to={"/create-trip"}>
                            <Button className="bg-[#ffb703] text-black hover:text-white">
                                Get Started, It's Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <ImageStackScroll />
                </div>
                <div className='flex flex-col items-center sm:mt-30 p-5'>
                    <h2 className=" text-center  text-xl md:text-4xl max-w-2xl mt-4l  ">
                        <span className='text-[#b40fc7]'>The Destination,  </span>
                        <span className='text-[#ff2200]'>The Journey, </span>
                        <span className='text-[#0d2de6]'>The Plan. ✨ </span>
                        Our AI was born from the desire to return—to the joy of discovery,
                        <span className='text-[#ffb703]'> to the essence of travel beyond the noise of planning.</span>
                    </h2>
                    <FeatureSection />
                </div>
            </div>

            <div className='mt-10 py-4 text-center'>

                <span class="flex items-center">
                    <span class="h-px flex-1 bg-gray-300"></span>

                    <h1 className='text-xl sm:text-3xl
                 font-bold text-black '>
                        Discover Your <span className='text-green-500'>Next Great Adventure</span>
                    </h1>

                    <span class="h-px flex-1 bg-gray-300"></span>
                </span>
                <VideoCarousel />
            </div>


            <div className=' flex flex-col justify-center items-center md:gap-15 lg:flex-row mt-10 mb-10'>
                <div className='w-fit text-justify'>
                    <h1 className='text-center text-xl sm:text-2xl md:text-4xl  max-w-2xl mt-4l text-purple-600 font-bold '>
                        Our Vision
                    </h1>
                    <p className=' text-lg max-w-xl sm:text-2xl lg:pl-10 p-8 mt-3 py-4'>
                        We see a world where travel is a bridge, not a barrier. <span className='text-[#e603ff]'> Our vision is to use intelligent technology not just to plan trips</span>,
                        but to foster understanding and create moments of genuine connection—to new places,
                        <span className='text-[#ff037d]'> new cultures, and new perspectives. </span>
                        By making travel seamless and deeply personal,
                        <span className='text-orange-500'> we believe we can help build a more curious and empathetic world, one journey at a time.</span>
                    </p>
                </div>
                <div>
                    <img src="/landing.png" className='h-110 max-xl:object-contain' alt="App Landing Page" />
                </div>
            </div>


        </>
    );
};


