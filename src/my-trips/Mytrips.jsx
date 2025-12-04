import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../service/FireBaseConfig';
import { useAuth } from '@/context/AuthContext'; // Context istemal karein
import { VscLoading } from "react-icons/vsc";
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { TripCard } from './TripCard';

function MyTrips() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetUserTrips = async () => {
      if (!user) {
        navigate('/');
        return;
      }

      setIsLoading(true);
      try {
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push(doc.data());
        });
        setUserTrips(trips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
        toast.error("Could not fetch your trips.");
      } finally {
        setIsLoading(false);
      }
    };
    
    GetUserTrips();
  }, [user, navigate]);

  const deleteTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      return;
    }
    
    toast.info("Deleting trip...");
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
      toast.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip.");
    }
  };

  const toggleFavorite = async (tripId, newStatus) => {
    try {
      const tripRef = doc(db, "AITrips", tripId);
      await updateDoc(tripRef, {
        isFavorite: newStatus
      });
      setUserTrips(prevTrips => 
        prevTrips.map(trip => 
          trip.id === tripId ? { ...trip, isFavorite: newStatus } : trip
        )
      );
      toast.success(newStatus ? "Trip added to favorites!" : "Trip removed from favorites.");
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error("Failed to update favorite status.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-5 sm:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className=" text-xl sm:text-2xl  font-bold text-gray-800 mb-8">My Trips</h1>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <VscLoading className="h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600">Loading your trips...</p>

          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {userTrips.map((trip) => (
             
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onDelete={deleteTrip}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No trips found.</h2>
            <p className="text-gray-500 mt-2">Ready to plan your next adventure?</p>
            <Button className="mt-6" onClick={() => navigate('/create-trip')}>Create a New Trip</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
