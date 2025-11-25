import { doc, getDoc,updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Heart } from 'lucide-react';
import { toast } from 'sonner'
import { db } from '../../service/FireBaseConfig'
import InformationSection from '../components/InformationSection'
import Hotels from '../components/Hotels'
import PlaceToVisit from '../components/PlaceToVisit'
import Foot from '../components/Foot'
import { VscLoading } from "react-icons/vsc";
import { Button } from '../../components/ui/button';
const ViewTrip = () => {
    const { tripId } = useParams()
    const [trip, setTrip] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (tripId) {
            GetTripData()
        }
    }, [tripId]);

    const toggleFavorite = async () => {
        if (!trip) return;
        const newFavoriteStatus = !trip.isFavorite;
        const tripRef = doc(db, "AITrips", tripId);
        await updateDoc(tripRef, {
            isFavorite: newFavoriteStatus
        });
        setTrip(prevTrip => ({ ...prevTrip, isFavorite: newFavoriteStatus }));
        toast.success(newFavoriteStatus ? "Added to favorites!" : "Removed from favorites.");
    };



    const GetTripData = async () => {
        setIsLoading(true);
        const docRef = doc(db, 'AITrips', tripId);
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTrip(docSnap.data());
            } else {
                console.log("No such document!");
                toast.error("No such trip document found!");
            }
        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast.error("Failed to fetch trip data.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>

            <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
                {isLoading ? (
                    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 200px)' }}>
                        <div className="text-center">
                            <VscLoading className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
                            <p className="mt-4 text-gray-600">Loading your trip details...</p>
                        </div>
                    </div>
                ) : trip ? (
                     <>
          <div className="flex justify-between items-center">
             <h2 className="text-xl sm:text-2xl font-bold">Your Trip Details</h2>
             <Button onClick={toggleFavorite} variant="outline" size="icon">
                <Heart 
                   className={`h-5 w-5 ${trip.isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
                />
             </Button>
          </div>
                        <InformationSection trip={trip} />
                        <Hotels trip={trip} />
                        <PlaceToVisit trip={trip} />

                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-700">Trip Not Found</h2>
                        <p className="text-gray-500 mt-2">The trip you are looking for does not exist or may have been deleted.</p>
                    </div>
                )}
            </div>
            <Foot />
        </>
    );
};

export default ViewTrip;