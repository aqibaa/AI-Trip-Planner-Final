

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveles in exploration',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A couple',
    desc: 'Two traveles in tandem',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 4 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '⛵',
    people: '5 to 10 People'
  },
]

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of cost',
    icon: '💵'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '💸'
  },
]

export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

**RESPONSE REQUIREMENTS:**
1.  **JSON ONLY:** Your entire response must be a single, raw, valid JSON object. Do not include any text, explanations, or markdown formatting (like \`\`\`json) before or after the JSON.
2.  **VALID SYNTAX:** All property names and string values must be enclosed in double quotes ("). Do not use trailing commas. Every value, including URLs, must be a valid JSON string.
3.  **ERROR HANDLING:** If you cannot find information for the requested location or cannot generate a valid plan for any reason, you MUST return this specific JSON object: { "error": "Unable to generate a travel plan for the specified request." }
4. **IMAGE URLS:** For all image URLs (HotelImageUrl, PlaceImageUrl ), leave the value as an empty string (""). I will provide the images myself.
**REQUESTED DATA:**
- A list of hotel options with keys: HotelName, HotelAddress, Price, HotelImageUrl, Rating, and 1 to 2 lines Description maximum 4 to 5 hotels.
- A day-by-day itinerary for {totalDays} days. Each day's plan should include a "bestTimeToVisit" key and a list of places.
- Each place in the itinerary must have these keys: PlaceName, (1 t0 2 lines) PlaceDetails , PlaceImageUrl, PlaceAddress, TicketPricing, TimeTravel and Rating.

**FINAL JSON STRUCTURE MUST BE EXACTLY LIKE THIS:**
{

  travelPlan: 
  budget:"Cheap"
  duration:"04 Days"

  "hotelOptions": [
    {
      "HotelName": "Example Hotel",
      "HotelAddress": "123 Example St, City",
      "Price": " Example $50 per night or day ",
      "Rating": 4.5,
      "Description": "1 to 2 lines A description of the hotel."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "bestTimeToVisit": "Morning",
      "plan": [
        {
          "PlaceName": "Example Place",
          "PlaceAddress": "Example Place Address, City",
          "PlaceDetails": "1 to 2 line Details about the place.",
          "TicketPricing": "Free",
          "Rating": 4.7,
          "TimeTravel": Example 2.5 hours
        }
      ]
    }
  ]
}
`