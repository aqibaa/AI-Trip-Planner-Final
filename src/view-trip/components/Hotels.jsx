import { Link } from 'react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Hotels = ({ trip }) => {
    return (
        <>
            <h2 className="shrink-0 px-4 text-gray-900 font-bold text-2xl mt-8">Hotel Recommendation</h2>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8  mt-5 '>
                {trip?.TripData?.hotelOptions?.map((hotel, index) => (

                    <Tooltip key={index}>
                        <TooltipTrigger>
                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.HotelName + "," + hotel?.HotelAddress} target='_blank'>
                                <div key={index} className='hover:scale-105 transition-all cursor-pointer '>
                                    <span className="flex items-center lg:hidden ">
                                        <span className="h-px flex-1 bg-gray-300"></span>

                                        <span className='text-green-500'></span>
                                        <span className="h-px flex-1 bg-gray-300"></span>
                                    </span>
                                    <img src={hotel.HotelImageUrl} className='rounded-xl object-cover h-[200px] sm:h-[300px] w-full mt-12' alt="" />
                                    <div className='my-2 flex flex-col text-left  gap-4 mt-4'>
                                        <h2 className='font-bold sm:text-xl'>{hotel.HotelName} </h2>
                                        <p className=' text-md sm:text-lg '>{hotel.Description}</p>
                                        <h2 className='text-sm sm:text-lg text-gray-500'>📍 {hotel.HotelAddress}</h2>
                                        <div className='flex justify-between items-center gap-5'>
                                            <h2 className='text-xs sm:text-lg'>💵 {hotel.Price}</h2>
                                            <h2 className='text-xs font-bold sm:text-lg'>🌟 {hotel.Rating} Rating</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={20} >
                            <p className='p-2 text-sm font-medium'>Click on a Card to Get the Location</p>
                        </TooltipContent>
                    </Tooltip>
                ))}

            </div>
        </>
    )
}

export default Hotels
