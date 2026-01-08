import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from "./components/room/ExistingRooms"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import AddRoom from "./components/room/AddRoom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"
import BookingSuccess from "./components/booking/BookingSuccess"
import Bookings from "./components/booking/Bookings"
import FindBooking from "./components/booking/FindBooking"
import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"

// Separate component to handle the location-based footer logic
const AppContent = () => {
  const location = useLocation();
  
  // Hide footer only if the current path is exactly "/admin"
  const showFooter = location.pathname !== "/admin";

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />

          <Route
            path="/book-room/:roomId"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="/browse-all-rooms" element={<RoomListing />} />

          {/* Protect these routes so only Admins/Managers can see them */}
<Route 
  path="/admin" 
  element={<RequireAuth><Admin /></RequireAuth>} 
/>
<Route 
  path="/add-room" 
  element={<RequireAuth><AddRoom /></RequireAuth>} 
/>
<Route 
  path="/existing-rooms" 
  element={<RequireAuth><ExistingRooms /></RequireAuth>} 
/>
          <Route path="/find-booking" element={<FindBooking />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<FindBooking />} />
					<Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;