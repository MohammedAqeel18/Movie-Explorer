#  Movie Explorer

 Introduction

Movie Explorer is a responsive,  movie discovery app built with React and TMDB API. Users can search, browse, view details, and save favorite movies — with full light/dark mode support, filters, and polished UI.



🔗 [View Live App Here](https://your-deployment-link.netlify.app)

---

 Features

-  **Search** for movies using TMDB
-  **Trending Movies** on home screen
-  **Favorites List** with local storage
-  **Movie Details** page with trailer, overview, rating, runtime, and release date
-  **Light / Dark Mode**
-  **Mobile-First Responsive Design**
-  **Infinite Scroll / Load More**
-  **Navigation Bar** with logout and favorites
-  **Genre, Year, Rating Filters**
-  **Scroll to Top** FAB
-  Accessible, semantic UI using **Material UI (MUI)**

---

## Tech Stack

- **React** with Hooks
- **React Router** for routing
- **Material UI (MUI)** for UI and responsiveness
- **TMDB API** for movie data
- **Vercel / Netlify** for deployment

---

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://gitlab.com/your-username/movie-explorer.git
   cd movie-explorer

2.**Install dependencies

    npm install

3.**Create a .env file
    REACT_APP_TMDB_API_KEY=46b9dd55cf19c5e124bbb3acfbe33277

4.**Run the app

    npm start


5.Folder Structure

src/
    api/               # Axios instance + TMDB API functions
    components/        # Reusable UI components (Navbar, SearchBar, etc.)
    context/           # Context API for Favorites
    pages/             # Main pages (Home, Favorites)
    App.js             # Main app routing logic
    index.js           # App entry point

6.Credits
    Movie data provided by TMDB
    UI built with Material UI


7.License
    This project is for educational purposes only and not intended for commercial use.

