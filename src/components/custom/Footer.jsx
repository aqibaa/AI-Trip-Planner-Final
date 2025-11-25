import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";


const Logo = () => (
    <div className="text-2xl font-bold text-white">
        AI-<span className="text-blue-400">Trip</span>-Planner
    </div>
);


// Reusable component for social media links
const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        {children}
    </a>
);

 function Footer() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null); // Footer element ko "dekhne" ke liye ek ref

  
    useEffect(() => {
    
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px", 
                threshold: 0.1, 
            }
        );

        footerRef.current
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []); 

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    return (
        <footer ref={footerRef} className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-15 lg:py-16">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pb-10 border-b border-gray-700">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Ready to plan your next <span className='text-orange-400'>adventure?</span>
                        </h2>
                        <p className="mt-2 text-lg text-gray-400">
                            Let our AI craft the perfect itinerary for you. It's fast, free, and fun.
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <Link to={"/create-trip"}>
                        <Button
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-500"
                        >
                            Get Started for Free
                        </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-8 py-15">

                    <div className=" col-span-4 md:col-span-4 lg:col-span-2 max-lg:flex justify-center items-center flex-col mb-12">
                        <Logo />
                        <p className="mt-4 text-gray-400 max-w-xs max-lg:text-center">
                            Your personal AI-powered travel agent for creating unforgettable journeys.
                        </p>
                        <div className="mt-6 flex space-x-6">
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.06-1.004.048-1.625.211-2.126.41-1.024.413-1.748 1.138-2.162 2.162-.199.501-.362 1.122-.41 2.126-.048 1.023-.06 1.351-.06 3.807s.012 2.784.06 3.807c.048 1.004.211 1.625.41 2.126.413 1.024 1.138 1.748 2.162 2.162.501.199 1.122.362 2.126.41 1.023.048 1.351.06 3.807.06h.468c2.456 0 2.784-.011 3.807-.06 1.004-.048 1.625-.211 2.126-.41 1.024-.413 1.748-1.138 2.162-2.162.199-.501.362-1.122.41-2.126.048-1.023.06-1.351.06-3.807s-.012-2.784-.06-3.807c-.048-1.004-.211-1.625-.41-2.126-.413-1.024-1.748-1.138-2.162-2.162-.501-.199-1.122-.362-2.126-.41-1.023-.048-1.351-.06-3.807-.06zm-1.634 11.11c-2.835 0-5.14-2.305-5.14-5.14s2.305-5.14 5.14-5.14 5.14 2.305 5.14 5.14-2.305 5.14-5.14 5.14zm0-8.481c-1.844 0-3.341 1.497-3.341 3.341s1.497 3.341 3.341 3.341 3.341-1.497 3.341-3.341-1.497-3.341-3.341-3.341zM18.805 5.01a1.26 1.26 0 100 2.52 1.26 1.26 0 000-2.52z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="#">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </SocialIcon>
                        </div>
                    </div>

                    <div className=" col-span-2 md:col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase md:tracking-wider text-gray-400">Product</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">How It Works</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Pricing</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase md:tracking-wider text-gray-400">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Our Vision</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase md:tracking-wider text-gray-400">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-semibold uppercase md:tracking-wider text-gray-400">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">Support</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-300">FAQ</a></li>
                        </ul>
                    </div>

                </div>

                <div className="pt-10 mt-8 border-t border-gray-700 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AI-Trip-Planner. All rights reserved.</p>
                  <button
                    onClick={scrollToTop}
                    className={`transition-opacity duration-300 ${isFooterVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                    fixed bottom-3 right-4 z-50 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                     transition-transform duration-300 transform hover:scale-110"`}
                    aria-label="Scroll to top"
                >
                    <div >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                    </div>
                </button>
                </div>
            </div>
        </footer>
    );
};
export default Footer;