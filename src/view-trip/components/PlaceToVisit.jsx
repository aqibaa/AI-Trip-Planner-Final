import PlaceCarditem from "./PlaceCarditem"
const PlaceToVisit = ({ trip }) => {
    return (
        <div className='mt-25'>
            <h2 className="shrink-0 px-4 text-gray-900 font-bold text-2xl">Places To Visit</h2>
            <div>
                {trip.TripData?.itinerary.map((item, index) => (
                    <div key={index}>
                        <span className="flex items-center mt-12">
                            <span className="h-px flex-1 bg-gray-300"></span>
                            <span className="shrink-0 px-4 font-bold text-xl text-orange-400">
                                Day<span className="text-black">-{item.day}</span></span>
                            <span class="h-px flex-1 bg-gray-300"></span>
                        </span>

                        <div className="grid  sm:grid-cols-2 gap-5 mt-10">
                            {item.plan.map((place, index) => (
                                <div key={index} className="my-3">
                                    <h2 className='font-medium  text-center '>Best Time To Visit : <span className='text-orange-700 font-bold'>{item.bestTimeToVisit}</span></h2>
                                    <PlaceCarditem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlaceToVisit
