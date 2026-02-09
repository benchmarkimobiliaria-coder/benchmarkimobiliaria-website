import React, { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider")
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("propertyFavorites")
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (err) {
      console.error("Error loading favorites from localStorage:", err)
    }
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem("propertyFavorites", JSON.stringify(favorites))
    } catch (err) {
      console.error("Error saving favorites to localStorage:", err)
    }
  }, [favorites])

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id)
      if (exists) {
        return prev.filter((fav) => fav.id !== item.id)
      } else {
        return [...prev, item]
      }
    })
  }

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id)
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
