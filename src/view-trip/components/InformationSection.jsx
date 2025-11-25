import { Badge } from "@/components/ui/badge"

const InformationSection = ({ trip }) => {
    return (
        <div className="mt-10">
            <img src={trip?.userSelection?.locationImageUrl} alt="image"
                className='h-[300px] sm:h-[500px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center '>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                    <div className="flex w-full flex-wrap gap-5">
                        <Badge className="sm:p-3">📅{trip.userSelection?.NoOfDays} Days</Badge>
                        <Badge variant="destructive">💸{trip.userSelection?.Budget} Budget</Badge>
                        <Badge variant="outline">✈️No Of Traveler: {trip.userSelection?.Traveler} Traveler</Badge>
                    </div>
                </div>



            </div>

        </div>

    )
}

export default InformationSection
