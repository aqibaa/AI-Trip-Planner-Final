import { useState } from 'react';
import MapboxGeocoderComponent from '../create-trip/MapboxGeocoderComponent';
import { Input } from '../components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '.././contants/Options.jsx';
import { getPhotoForPlace } from '@/service/PexelsService'; // Naya service import karein

import { Button } from '../components/ui/button'
import { toast } from 'sonner';
import { generateTravelPlan } from '../service/AIModel.jsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.jsx"
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '@/context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../service/FireBaseConfig.jsx';
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from 'react-router';
import Foot from '../view-trip/components/Foot.jsx'

function CreateTrip() {
  const [selectedPlace, setSelectedPlace] = useState(null);
   const { user, login } = useAuth(); 
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const [clearInputTrigger, setClearInputTrigger] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  const navigate = useNavigate();


  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResult = async (result) => {
    setSelectedPlace(result);
    const cityImageUrl = await getPhotoForPlace(result.text);
    setFormData({
      ...formData,
      location: result.place_name,
      locationImageUrl: cityImageUrl
    });
  };

  const handleClear = () => {
    setSelectedPlace(null);
    console.clear();
    setClearInputTrigger(prev => prev + 1);
    setFormData({
      ...formData,
      location: null,
    });
  };


  const Login = useGoogleLogin({
    onSuccess: (codeResp) => GetUSerProfile(codeResp),
    onError: (error) => console.log(error)


  })


  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.NoOfDays > 10) {
      toast("Please reduce the No of Days to 10.");
      return
    }

    if (!formData.location || !formData.Budget || !formData.Traveler || !formData.NoOfDays) {
      toast("Please fill all the details before generating a trip.")
      return;
    }

    setIsLoading(true);
    toast.info("Hold on, we're crafting your perfect trip...");

    const Final_Prompt = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.NoOfDays)
      .replace('{traveler}', formData?.Traveler)
      .replace('{budget}', formData?.Budget)
      .replace('{totalDays}', formData?.NoOfDays)


    try {
      const result = await generateTravelPlan(Final_Prompt);
      if (result.error || !result.hotelOptions || !result.itinerary) {
        throw new Error(result.error || "AI returned an invalid or incomplete trip plan.");
      }
      const enrichedHotelOptions = await Promise.all(
        result.hotelOptions.map(async (hotel) => {
          const imageUrl = await getPhotoForPlace(hotel.HotelName + " " + formData.location);
          return { ...hotel, HotelImageUrl: imageUrl };
        })
      );

      const enrichedItinerary = await Promise.all(
        result.itinerary.map(async (dayPlan) => {
          const enrichedPlan = await Promise.all(
            dayPlan.plan.map(async (place) => {
              const imageUrl = await getPhotoForPlace(place.PlaceName + " " + formData.location);
              return { ...place, PlaceImageUrl: imageUrl };
            })
          );
          return { ...dayPlan, plan: enrichedPlan };
        })
      );
      const finalTripPlan = {
        ...result,
        hotelOptions: enrichedHotelOptions,
        itinerary: enrichedItinerary,
      };
      toast.info("Saving your trip to the database...");
      const docId = await SaveAITrip(finalTripPlan);
      toast.success("Your trip has been generated and saved successfully!");
      navigate('/view-trip/' + docId);

    }
    catch (error) {
      console.error("AI Generation Failed:", result.error);
      toast("Error generating trip plan. Please try again.");
      // setIsLoading(false);
    }
    finally {
      setIsLoading(false);
    }

  }


  const SaveAITrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        TripData: tripData,
        userEmail: user?.email,
        id: docId,
      });
      return docId;

    } catch (error) {
      console.error("Error saving trip to Firestore:", error);
      throw error;
    }

  };


  const GetUSerProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: 'Application/json'
        }
      }).then((resp) => {
      login(resp.data);
        setOpenDialog(false);
        OnGenerateTrip()
      })
  }

  if (!mapboxToken) {
    console.error("ERROR: Mapbox Access Token is missing.");
    return <div>Error: Mapbox configuration is missing.</div>;
  }

  return (
    <>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-2xl sm:text-3xl text-center'>Tell us your travel preferences 🏕️🌴</h2>
        <p className='text-gray-500 md:text-xl text-center mt-5'>
          Just provide some basic information,
          and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className='mt-20 max-w-5xl mx-auto'>
          <div>
            <h2 className='text-lg sm:text-2xl max-sm:text-center font-medium my-3'>
              What is destination of choice?
            </h2>
            <div className="flex items-center gap-4 max-sm:justify-center">
              <MapboxGeocoderComponent
                accessToken={mapboxToken}
                onResult={handleResult}
                onClear={handleClear}
                clearInputTrigger={clearInputTrigger}
              />
              <Button
                onClick={handleClear}
                className="p-5 py-6"
                aria-label="Clear search"
              >
                Clear
              </Button>
            </div>
            {selectedPlace && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg animate-fade-in">
                <h3 className="font-semibold text-gray-800">Selected Location Details:</h3>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                  <strong>Name:</strong> {selectedPlace.text} <br />
                  <strong>Address:</strong> {selectedPlace.place_name} <br />
                  <strong>Coordinates:</strong> Lng: {selectedPlace.center[0]}, Lat: {selectedPlace.center[1]}
                </p>
              </div>
            )}
          </div>
          <div className='py-10'>
            <h2 className='text-lg md:text-2xl my-3 max-sm:text-center font-medium'>How many days are you planning your trip?</h2>
            <Input
              placeholder={'Ex. 3'}
              type='number'
              className='mt-5'
              onChange={(e) => handleInputChange('NoOfDays', e.target.value)}
            />
          </div>

          <div className='py-10'>
            <h2 className='text-lg sm:text-xl max-sm:text-center my-3 font-medium'>What is Your Budget?</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 mt-10 w-full'>
              {SelectBudgetOptions.map((item, index) => (
                <div key={index} onClick={() => handleInputChange('Budget', item.title)}
                  className={`p-4 rounded-lg cursor-pointer border hover:shadow-lg transition-all ${formData?.Budget === item.title ? 'shadow-lg border-black' : ''}`}>
                  <h2 className='text-4xl mb-3'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className='py-10'>
            <h2 className='text-lg sm:text-xl max-sm:text-center my-3 font-medium'>Who is traveling with you?</h2>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10 w-full'>
              {SelectTravelsList.map((item, index) => (
                <div key={index} onClick={() => handleInputChange('Traveler', item.people)}
                  className={`p-4 rounded-lg cursor-pointer border hover:shadow-lg transition-all ${formData?.Traveler === item.people ? 'shadow-lg border-black' : ''}`}>
                  <h2 className='text-4xl mb-3'>{item.icon}</h2>
                  <h2 className='font-bold text-lg'>{item.title}</h2>
                  <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='my-10 flex justify-end'>
          <Button
            disabled={isLoading}
            onClick={OnGenerateTrip}
          >
            {
              isLoading ?
                <VscLoading className='h-7 w-7 animate-spin' />
                : 'Generate Trip'
            }

          </Button>
        </div>
        <Dialog
          open={openDialog}
          onOpenChange={setOpenDialog} // Isse dialog bahar click karne par bhi band ho jayega
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex justify-center">
                <img src="/logo.svg" alt="LOGO" />
              </DialogTitle>
              <DialogDescription className="text-center">
                <h2 className='font-bold text-lg mt-7'>Sign In to Continue</h2>
                <p className="mt-2">Please sign in with Google to generate your trip.</p>
                <Button
                  className="w-full mt-5 p-6 text-base flex gap-4 items-center"
                  onClick={() => Login()}
                >
                  <FcGoogle className='h-7 w-7' />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Foot />
    </>
  );
}

export default CreateTrip;