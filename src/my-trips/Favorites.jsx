import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../service/FireBaseConfig';
import { useAuth } from '@/context/AuthContext';
import { TripCard } from './TripCard';
import { VscLoading } from 'react-icons/vsc';
import { toast } from 'sonner';




function Favorites() {
    const { user } = useAuth();
    const [favoriteTrips, setFavoriteTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            GetFavoriteTrips();
        }
    }, [user]);

    const GetFavoriteTrips = async () => {
        setIsLoading(true);
        const q = query(collection(db, "AITrips"),
            where("userEmail", "==", user.email),
            where("isFavorite", "==", true) // Sirf favorite trips ke liye query
        );
        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });
        setFavoriteTrips(trips);
        setIsLoading(false);
    };
    const deleteTrip = async (tripId) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return;
        try {
            await deleteDoc(doc(db, "AITrips", tripId));
            setFavoriteTrips(prev => prev.filter(trip => trip.id !== tripId));
            toast.success("Trip deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete trip.");
        }
    };

    const toggleFavorite = async (tripId, newStatus) => {
        try {
            const tripRef = doc(db, "AITrips", tripId);
            await updateDoc(tripRef, { isFavorite: newStatus });
            // Favorites page par, unfavorite karne ka matlab hai ke trip ko list se hata dein
            if (!newStatus) {
                setFavoriteTrips(prev => prev.filter(trip => trip.id !== tripId));
            }
            toast.success(newStatus ? "Trip remains a favorite." : "Trip removed from favorites.");
        } catch (error) {
            toast.error("Failed to update favorite status.");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-5 sm:p-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">My Favorite Trips</h1>
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-64">
                        <VscLoading className="h-12 w-12 animate-spin text-blue-500" />
                    <p className="mt-4 text-gray-600">Loading your Favorite trips...</p>

                    </div>
                ) : favoriteTrips.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {favoriteTrips.map((trip) => (
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
                        <h2 className="text-2xl font-semibold text-gray-700">No favorite trips yet.</h2>
                        <p className="text-gray-500 mt-2">You can add trips to your favorites from the "My Trips" page.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;