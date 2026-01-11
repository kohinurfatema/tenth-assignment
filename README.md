 # 🌱 EcoTrack - Sustainability Challenge Platform

  A full-stack community platform for everyday sustainability actions. Join eco-friendly challenges, track your environmental impact, and make a real difference for our planet.

  ![EcoTrack Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=400&fit=crop)

  ## 🌐 Live Demo

  - **Live Site:** [EcoTrack Live](https://your-live-url.web.app)
  - **Client Repo:** [GitHub - Frontend](https://github.com/yourusername/eco-track-client)
  - **Server Repo:** [GitHub - Backend](https://github.com/yourusername/eco-track-server)

  ---

  ## 🔐 Demo Credentials

  | Role    | Email                  | Password     |
  |---------|------------------------|--------------|
  | User    | demo@ecotrack.com      | Demo@123     |
  | Manager | manager@ecotrack.com   | Manager@123  |
  | Admin   | admin@ecotrack.com     | Admin@123    |

  ---

  ## ✨ Features

  ### Public Features
  - 🏠 Beautiful responsive landing page with 10+ sections
  - 🎠 Interactive hero banner with carousel and animations
  - 📊 Live community impact statistics
  - 🔍 Challenge search, filter, and sort functionality
  - 📄 Challenge details with image gallery and reviews
  - 🌙 Light/Dark mode toggle
  - 📱 Fully responsive design (mobile, tablet, desktop)

  ### User Features
  - 🔐 Secure authentication (Email/Password + Google Sign-in)
  - 📈 Personal dashboard with progress tracking
  - 🏆 Join and track eco-challenges
  - 📊 View personal impact metrics
  - 👤 Editable user profile
  - 📋 Activity history and achievements

  ### Admin/Manager Features
  - 👥 User management (Admin)
  - 📝 Challenge management (CRUD operations)
  - 📊 Platform analytics with charts
  - 📈 Growth metrics and statistics

  ---

  ## 🛠️ Tech Stack

  ### Frontend
  - **React 18** - UI Library
  - **React Router v7** - Client-side routing
  - **Tailwind CSS v4** - Utility-first CSS
  - **DaisyUI** - Component library
  - **Recharts** - Data visualization
  - **React Icons** - Icon library
  - **React Hot Toast** - Notifications
  - **Firebase Auth** - Authentication

  ### Backend
  - **Node.js** - Runtime environment
  - **Express.js** - Web framework
  - **MongoDB** - Database
  - **Mongoose** - ODM

  ---

  ## 📁 Project Structure

  eco-track/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── home/
  │   │   │   ├── HeroBanner.jsx
  │   │   │   ├── LiveStatistics.jsx
  │   │   │   ├── ActiveChallengesGrid.jsx
  │   │   │   ├── RecentTips.jsx
  │   │   │   ├── UpcomingEvents.jsx
  │   │   │   ├── Testimonials.jsx
  │   │   │   ├── WhyGoGreen.jsx
  │   │   │   ├── HowItWorks.jsx
  │   │   │   ├── FAQ.jsx
  │   │   │   └── Newsletter.jsx
  │   │   ├── Navbar.jsx
  │   │   └── Footer.jsx
  │   ├── context/
  │   │   ├── AuthContext.jsx
  │   │   └── ThemeContext.jsx
  │   ├── data/
  │   │   └── apiClient.js
  │   ├── layouts/
  │   │   ├── PublicLayout.jsx
  │   │   └── DashboardLayout.jsx
  │   ├── pages/
  │   │   ├── HomePage.jsx
  │   │   ├── ChallengesPage.jsx
  │   │   ├── ChallengeDetailPage.jsx
  │   │   ├── LoginPage.jsx
  │   │   ├── RegisterPage.jsx
  │   │   ├── DashboardOverview.jsx
  │   │   ├── ProfilePage.jsx
  │   │   ├── AboutPage.jsx
  │   │   ├── ContactPage.jsx
  │   │   └── ...
  │   ├── routes/
  │   │   ├── router.jsx
  │   │   └── ProtectedRoute.jsx
  │   ├── index.css
  │   └── main.jsx
  ├── .env
  ├── package.json
  └── README.md

  ---

  ## 🚀 Getting Started

  ### Prerequisites
  - Node.js (v18 or higher)
  - npm or yarn
  - MongoDB database
  - Firebase project (for authentication)

  ### Installation

  1. **Clone the repository**
     ```bash
     git clone https://github.com/yourusername/eco-track.git
     cd eco-track

  2. Install dependencies
  npm install
  3. Set up environment variables

  3. Create a .env file in the root directory:
  VITE_API_URL=http://localhost:5000
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  4. Run the development server
  npm run dev
  5. Open in browser
  http://localhost:5173

  ---
  📸 Screenshots

  Home Page

  https://via.placeholder.com/800x400?text=Home+Page+Screenshot

  Challenges Page

  https://via.placeholder.com/800x400?text=Challenges+Page+Screenshot

  Dashboard

  https://via.placeholder.com/800x400?text=Dashboard+Screenshot

  Dark Mode

  https://via.placeholder.com/800x400?text=Dark+Mode+Screenshot

  ---
  🎨 Color Palette
  ┌───────────┬─────────┬──────────────────┐
  │   Color   │   Hex   │      Usage       │
  ├───────────┼─────────┼──────────────────┤
  │ Primary   │ #22c55e │ Success/Green    │
  ├───────────┼─────────┼──────────────────┤
  │ Secondary │ #3b82f6 │ Blue accents     │
  ├───────────┼─────────┼──────────────────┤
  │ Accent    │ #f59e0b │ Amber highlights │
  ├───────────┼─────────┼──────────────────┤
  │ Neutral   │ #1f2937 │ Dark backgrounds │
  └───────────┴─────────┴──────────────────┘
  ---
  📱 Responsive Breakpoints

  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

  ---
  ✅ Requirements Checklist

  - Maximum 3 primary colors + neutral
  - Light & Dark mode with proper contrast
  - Consistent layout, spacing, and alignment
  - Same size cards with uniform styling
  - Form validation with error messages and loaders
  - Fully responsive design
  - No placeholder/dummy content
  - 10+ meaningful home page sections
  - Sticky navbar with active link indicators
  - Hero section (60-70% height) with animations
  - Card grid (4 per row on desktop)
  - Skeleton loaders
  - Details page with image gallery and reviews
  - Search, filter, sort, and pagination
  - Demo login buttons
  - Google social login
  - Role-based dashboard (User/Manager/Admin)
  - Charts with dynamic data
  - Editable profile page

  ---
  🤝 Contributing

  Contributions are welcome! Please feel free to submit a Pull Request.

  1. Fork the repository
  2. Create your feature branch (git checkout -b feature/AmazingFeature)
  3. Commit your changes (git commit -m 'Add some AmazingFeature')
  4. Push to the branch (git push origin feature/AmazingFeature)
  5. Open a Pull Request

  ---
  📄 License

  This project is licensed under the MIT License - see the LICENSE file for details.

  ---
  👨‍💻 Author

  Your Name
  - GitHub: https://github.com/yourusername
  - LinkedIn: https://linkedin.com/in/yourprofile

  ---
  🙏 Acknowledgments

  - https://tailwindcss.com/
  - https://daisyui.com/
  - https://react-icons.github.io/react-icons/
  - https://unsplash.com/ for images
  - https://firebase.google.com/ for authentication

