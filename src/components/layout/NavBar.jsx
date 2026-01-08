import React, { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"
import { useAuth } from "../auth/AuthProvider"

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false)
  const { user } = useAuth() // Use context instead of manual localStorage

  const handleAccountClick = () => {
    setShowAccount(!showAccount)
  }

  const isLoggedIn = user !== null
  
  // Robust check for Admin: handles string or array from JWT
  const roles = user?.role || user?.roles || []
  const isAdmin = Array.isArray(roles) 
    ? roles.includes("ROLE_ADMIN") 
    : roles === "ROLE_ADMIN"

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">TripByte Hotel</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/browse-all-rooms"}>Browse all rooms</NavLink>
            </li>

            {/* Admin Button Fix */}
            {isLoggedIn && isAdmin && (
  <li className="nav-item">
    <NavLink className="nav-link" to={"/admin"}>Admin</NavLink>
  </li>
)}
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>Find my booking</NavLink>
            </li>

            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`} 
                 role="button" onClick={handleAccountClick}>
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}>
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li><Link className="dropdown-item" to={"/login"}>Login</Link></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar