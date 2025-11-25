import React, { useRef, useEffect } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

 function MapboxGeocoderComponent({ onResult, accessToken,clearInputTrigger }) {
  const geocoderContainerRef = useRef(null);
  const geocoderInstanceRef = useRef(null); 



    useEffect(() => {
    if (clearInputTrigger === 0) return;

    if (geocoderInstanceRef.current) {
      geocoderInstanceRef.current.clear();
    }
  }, [clearInputTrigger]);

  useEffect(() => {
    if (!geocoderContainerRef.current || !accessToken) {
      return;
    }

    if (geocoderInstanceRef.current) {
      return; 
    }

    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      types: 'place,locality,postcode,address',
      placeholder: 'Enter a city or place',
    });
    
    geocoderInstanceRef.current = geocoder;
    
    geocoder.addTo(geocoderContainerRef.current);

  const handleResult = (e) => {
       
            onResult(e.result);
        
    };
    

    geocoder.on('result', handleResult);
   
    return () => {
     
    };
  }, [accessToken, onResult]); 

  return <div ref={geocoderContainerRef}/>;
};

export default MapboxGeocoderComponent;