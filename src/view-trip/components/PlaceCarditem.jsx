import { Link } from 'react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const PlaceCarditem = ({ place }) => {
    return (
        <>

            <Tooltip>
                <TooltipTrigger>

                    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.PlaceName + "," + place?.PlaceAddress} target='_blank'>
                        <div className='border rounded-xl p-6 min-xl:flex lg:mt-4 gap-5 xl:text-left hover:scale-95 transition-all
                                  hover:shadow-lg cursor-pointer max-lg:mt-6'>
                            <img src={place.PlaceImageUrl}
                                className='max-lg:h-auto lg:h-[150px] rounded-xl object-cover mx-auto' />
                            <div className='mt-5'>
                                <h2 className='text-purple-800 font-bold sm:text-xl'>🚇 {place.PlaceName}</h2>
                                <p className='text-gray-400 mt-3 text-xs sm:text-sm font-medium'>{place.PlaceDetails}</p>
                                <div className='flex justify-between items-center mt-2'>
                                    <h2 className='mt-3 text-sm font-bold '>⏲️ {place.TimeTravel}</h2>
                                    <h2 className='mt-3 text-sm font-bold '>🎫 {place.TicketPricing}</h2>
                                </div>
                            </div>

                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={-20}>
                    <p className='p-2 text-sm font-medium'>Click on a Card to Get the Location</p>
                </TooltipContent>
            </Tooltip>

        </>
    )
}

export default PlaceCarditem
