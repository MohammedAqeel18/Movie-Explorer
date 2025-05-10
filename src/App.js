import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './pages/Home';
import MovieDetails from "./components/MovieDetails";
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MovieProvider } from './context/MovieContext';

function App() {
  const [user, setUser] = useState(null);
  const [clearSearch, setClearSearch] = useState(false);

  return (
    <MovieProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Top Navbar if logged in */}
          {user && (
            <Navbar
              onLogout={() => setUser(null)}
              onHomeClick={() => setClearSearch(true)}
            />
          )}

          {/* Main Page Content */}
          <div style={{ flex: 1 }}>
            <Routes>
              {!user ? (
                <Route path="*" element={<Login onLogin={setUser} />} />
              ) : (
                <>
                  <Route
                    path="/"
                    element={
                      <Home
                        clearSearch={clearSearch}
                        setClearSearch={setClearSearch}
                      />
                    }
                  />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                </>
              )}
            </Routes>
          </div>

          {/* Footer & Scroll To Top (only when logged in) */}
          {user && (
            <>
              <Footer />
              <ScrollToTop />
            </>
          )}
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
