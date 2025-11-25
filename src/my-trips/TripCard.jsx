import { Heart, MoreVertical, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 
 export const TripCard = ({ trip, onDelete, onToggleFavorite }) => {
  const navigate = useNavigate();
  const locationName = trip.userSelection?.location || 'Unknown Destination';
  const cityImageUrl = trip.userSelection?.locationImageUrl || 'https://via.placeholder.com/400x300?text=Trip+Image';

  // onClick event ko bubbling se rokne ke liye
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(trip.id);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(trip.id, !trip.isFavorite);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative"
      onClick={() => navigate(`/view-trip/${trip.id}`)}
    >
      <img src={cityImageUrl} alt={locationName} className="w-full h-48 object-cover" />
      {trip.isFavorite && (
        <Heart className="absolute top-3 right-3 text-red-500 fill-current" size={20} />
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">{locationName}</h3>
        <p className="text-sm text-gray-500 mt-1">{trip.userSelection?.NoOfDays} Days Trip</p>
        <div className="mt-4 border-t pt-4 flex justify-between items-center text-xs text-gray-600">
          <span><strong>Budget:</strong> {trip.userSelection?.Budget}</span>
          <span><strong>Travelers:</strong> {trip.userSelection?.Traveler}</span>
        </div>
      </div>
      <div className="absolute top-2 left-2" onClick={handleDropdownClick}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  className="h-10 w-10 p-0 rounded-full bg-black/30 hover:bg-black/50 text-white">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleFavoriteClick}>
              <Heart className="mr-2 h-4 w-4" />
              <span>{trip.isFavorite ? 'Unfavorite' : 'Favorite'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
