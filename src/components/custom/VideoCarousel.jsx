import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


const videos = [
  { id: 3, videoSrc: "/videos/v3.mp4", posterSrc: "/posters/poster3.png" },
  { id: 2, videoSrc: "/videos/v2.mp4", posterSrc: "/posters/poster2.png" },
  { id: 5, videoSrc: "/videos/v5.mp4", posterSrc: "/posters/poster5.png" },
  { id: 11, videoSrc: "/videos/v11.mp4", posterSrc: "/posters/poster11.png" },
  { id: 6, videoSrc: "/videos/v6.mp4", posterSrc: "/posters/poster6.png" },
  { id: 9, videoSrc: "/videos/v9.mp4", posterSrc: "/posters/poster9.png" },
  { id: 4, videoSrc: "/videos/v4.mp4", posterSrc: "/posters/poster4.png" },
  { id: 8, videoSrc: "/videos/v8.mp4", posterSrc: "/posters/poster8.png" },
  { id: 10, videoSrc: "/videos/v10.mp4", posterSrc: "/posters/poster10.png" },
  { id: 12, videoSrc: "/videos/v12.mp4", posterSrc: "/posters/poster12.png" },
  { id: 14, videoSrc: "/videos/v14.mp4", posterSrc: "/posters/poster14.png" },
  { id: 19, videoSrc: "/videos/v19.mp4", posterSrc: "/posters/poster19.png" },
  { id: 13, videoSrc: "/videos/v13.mp4", posterSrc: "/posters/poster13.png" },
  { id: 15, videoSrc: "/videos/v15.mp4", posterSrc: "/posters/poster15.png" },
  { id: 20, videoSrc: "/videos/v20.mp4", posterSrc: "/posters/poster20.png" },
  { id: 17, videoSrc: "/videos/v17.mp4", posterSrc: "/posters/poster17.png" },
];

const LazyVideo = ({ videoSrc, posterSrc }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(videoRef.current);
        }
      },
      { threshold: 0.1 }
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  return (
    <div ref={videoRef} className="overflow-hidden rounded-lg h-83 sm:h-58">
      {isVisible ? (
        <video
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={posterSrc} alt="Loading destination video" className="w-full h-full object-cover" />
      )}
    </div>
  );
};


export function VideoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div className="w-full p-5 mt-5 sm:p-10 py-10 sm:mt-10"
      onMouseLeave={() => plugin.current && plugin.current.play()}>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem key={video.id} className="basis-1/2 md:basis-1/3 lg:basis-1/3">
              <div className="p-1">
                <LazyVideo videoSrc={video.videoSrc} posterSrc={video.posterSrc} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
