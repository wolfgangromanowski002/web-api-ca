import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));}, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);}
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((m) => m.id !== movie.id));};

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,}}>
      {children}
    </MoviesContext.Provider>
  );};

export default MoviesContextProvider;
