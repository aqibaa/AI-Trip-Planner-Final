# ai-trip-planner
AI-Powered Smart Travel Planner The AI Trip Planner is a modern React application designed to revolutionize travel organization. By integrating Google’s Gemini AI, the app transforms user inputs—destination, duration, budget, and traveler type—into comprehensive, personalized itineraries in seconds.

 AI-Powered Trip Planner
<img width="1896" height="898" alt="Screenshot 2025-11-22 072128" src="https://github.com/user-attachments/assets/320a7e5d-15c3-44ae-b762-9a0cdd15da56" />


AI Trip Planner is a modern, full-stack capable web application designed to revolutionize the way users plan their travels. By leveraging the power of Google Gemini AI, it generates personalized, day-by-day itineraries based on user preferences, complete with hotel recommendations and curated activities.
Unlike standard text-based planners, this application integrates the Pexels API to dynamically fetch stunning, high-quality images for every destination, creating a visually immersive experience.
🚀 Live Demo

✨ Key Features
🤖 AI-Generated Itineraries: Uses Google Gemini 1.5 Flash to create detailed, day-by-day travel plans including best times to visit, ticket pricing, and travel time.
📍 Smart Location Search: Integrated Mapbox Geocoding for precise and easy destination selection.
📸 Dynamic Visuals: Automatically fetches high-quality, location-specific images for hotels and tourist spots using the Pexels API, replacing generic AI placeholders.
🔐 Secure Authentication: Google Sign-In integration via Firebase Authentication.
💾 Cloud Storage: Saves generated trips, user history, and favorites securely in Firebase Firestore.
❤️ Favorites & Management: Users can manage their dashboard by deleting old trips or marking special ones as "Favorites" for quick access.
📱 Fully Responsive: Built with Tailwind CSS and Shadcn/UI, featuring a mobile-first design with animated side navigation.
🛠️ Tech Stack
Frontend: React.js (Vite)
Styling: Tailwind CSS, Shadcn/UI, Lucide React (Icons)
AI Model: Google Gemini AI (gemini-flash-latest)
APIs:
Mapbox GL (Location Autocomplete)
Pexels API (Image Sourcing)
Backend/BaaS: Firebase (Authentication & Firestore Database)
Deployment: Vercel
⚙️ Environment Variables
To run this project locally, you will need to add the following environment variables to your .env.local file.
code
Env
# Google Gemini AI
VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key

# Mapbox
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Pexels
VITE_PEXELS_API_KEY=your_pexels_api_key

# Google OAuth (for Login)
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_client_id

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
🚀 Getting Started
Follow these steps to set up the project locally on your machine.
1. Clone the repository
code
Bash
git clone https://github.com/your-username/ai-trip-planner.git
cd ai-trip-planner
2. Install dependencies
code
Bash
npm install
3. Configure Environment Variables
Create a .env.local file in the root directory and add your API keys as shown in the section above.
4. Run the development server
code
Bash
npm run dev
Open http://localhost:5173 with your browser to see the result.
📸 Screenshots
(Optional: Add screenshots of your app here to make the README more attractive)
Landing Page	Trip Generation
<img width="1896" height="898" alt="Screenshot 2025-11-22 072128" src="https://github.com/user-attachments/assets/ebdc832e-ac75-4663-b4a6-98d312b2ce74" />
<img width="1837" height="836" alt="Screenshot 2025-11-22 072208" src="https://github.com/user-attachments/assets/6115f40c-5a91-4b76-9662-66cd1e09e5f0" />
<img width="1878" height="824" alt="Screenshot 2025-11-22 072243" src="https://github.com/user-attachments/assets/7d78836f-aaaa-422b-a59b-515c9d7a07db" />
<img width="1890" height="891" alt="Screenshot 2025-11-22 072528" src="https://github.com/user-attachments/assets/30812b8d-3e83-42e1-b0d5-ab55a59661fd" />
Itinerary View	My Trips
<img width="1821" height="831" alt="Screenshot 2025-11-22 071732" src="https://github.com/user-attachments/assets/e4c0b820-7319-42e3-a276-a2402f6aca20" />
🤝 Contributing
Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
💖 Acknowledgments
Google Gemini for the incredible AI capabilities.
Shadcn/UI for the beautiful, accessible components.
Pexels for providing a free, high-quality image API.
👤 Author
Your Name
GitHub: @aqibaa
LinkedIn: (https://www.linkedin.com/in/aaqib-aarif)
