import React, { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
  // Initialize state from token in localStorage so it persists on refresh
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        return jwtDecode(token)
      } catch (error) {
        return null
      }
    }
    return null
  })

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token)
    localStorage.setItem("userId", decodedUser.sub)
    // Store roles accurately
    localStorage.setItem("userRole", JSON.stringify(decodedUser.roles || decodedUser.role))
    localStorage.setItem("token", token)
    setUser(decodedUser)
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)